/* screen-view.jsx — Vue dynamique / collection (un dossier = des filtres) */
const { useState: useStateVW, useMemo: useMemoVW } = React;

// recipe chip: { kind: 'type'|'status'|'conf'|'tag'|'person'|'starred'|'project', value, label, color }
const RECIPES = {
  recents:   { recipe: [], sort: "date", note: "Triés par date — les plus récents d'abord" },
  shared:    { recipe: [{ kind: "shared", label: "Partagé avec moi", color: "gray" }] },
  pending:   { recipe: [{ kind: "status", value: "En attente", label: "Statut : En attente", color: "amber" }, { kind: "status", value: "À relire", label: "Statut : À relire", color: "amber" }] },
  projects:  { recipe: [{ kind: "project", label: "A un projet", color: "violet" }] },
  important: { recipe: [{ kind: "starred", label: "Épinglé", color: "amber" }] },
  // custom saved view (showcase)
  meridian:  { title: "Contrats & avenants — Meridian", icon: "building", desc: "Tout le dossier client Meridian, reconstitué par tags.", recipe: [{ kind: "tag", value: "Meridian", label: "Meridian", color: "amber" }] },
};

function matchChip(doc, c) {
  switch (c.kind) {
    case "type": return doc.type === c.value;
    case "status": return doc.status.label === c.value;
    case "conf": return doc.conf.label === c.value;
    case "tag": return doc.tags.some((t) => t.label === c.value);
    case "person": return doc.owner === c.value || doc.shared.includes(c.value);
    case "shared": return doc.shared.includes("cp") && doc.owner !== "cp";
    case "starred": return doc.starred;
    case "project": return doc.tags.some((t) => t.kind === "projet");
    default: return true;
  }
}

// group chips by kind: OR within a kind, AND across kinds
function applyRecipe(recipe, sort) {
  const byKind = {};
  recipe.forEach((c) => { (byKind[c.kind] = byKind[c.kind] || []).push(c); });
  let r = DOCS.filter((doc) => Object.values(byKind).every((chips) => chips.some((c) => matchChip(doc, c))));
  if (sort === "date") r = [...r].sort((a, b) => b.date.localeCompare(a.date));
  return r;
}

const ADD_MENU = [
  { group: "Type", kind: "type", opts: Object.entries(TYPES).map(([k, m]) => ({ value: k, label: m.label, color: "blue" })) },
  { group: "Statut", kind: "status", opts: [["Signé", "green"], ["Validé", "green"], ["En attente", "amber"], ["À relire", "amber"], ["Brouillon", "gray"]].map(([v, c]) => ({ value: v, label: v, color: c })) },
  { group: "Confidentialité", kind: "conf", opts: [["Public", "teal"], ["Interne", "gray"], ["Confidentiel", "red"], ["Restreint", "red"]].map(([v, c]) => ({ value: v, label: v, color: c })) },
  { group: "Tag", kind: "tag", opts: ["Projet Atlas", "Refonte SI", "Budget 2026", "Meridian", "Télétravail", "RH", "Finance"].map((v) => ({ value: v, label: v, color: "violet" })) },
];

function ViewScreen({ viewId, viewMode, onOpenDoc, onTag, navigate, onBack }) {
  const base = RECIPES[viewId] || RECIPES.recents;
  const viewMeta = VIEWS.find((v) => v.id === viewId);
  const title = base.title || (viewMeta ? viewMeta.label : "Vue");
  const icon = base.icon || (viewMeta ? viewMeta.icon : "layers");
  const desc = base.desc || (viewMeta ? viewMeta.desc : "");

  const [recipe, setRecipe] = useStateVW(base.recipe);
  const [mode, setMode] = useStateVW(viewMode === "tabs" ? "list" : "grid");
  const [addOpen, setAddOpen] = useStateVW(false);
  const [shared, setShared] = useStateVW(false);

  const docs = useMemoVW(() => applyRecipe(recipe, base.sort), [recipe]);
  const removeChip = (i) => setRecipe((r) => r.filter((_, j) => j !== i));
  const addChip = (chip) => { if (!recipe.find((c) => c.kind === chip.kind && c.value === chip.value)) setRecipe((r) => [...r, chip]); setAddOpen(false); };

  const team = ["cp", "tr", "kb", "jf"];

  return (
    <div className="screen-scroll">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "22px var(--header-pad) 60px" }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 16 }}><Icon name="chevronLeft" size={15} /> Accueil</button>

        {/* header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
          <span style={{ width: 50, height: 50, borderRadius: "var(--r-md)", background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center", flex: "none" }}>
            <Icon name={icon} size={24} stroke={1.6} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 className="t-display" style={{ fontSize: 26, margin: 0 }}>{title}</h1>
              <span className="chip" style={{ background: "var(--slate-3)", color: "var(--text-muted)" }}>{docs.length} document{docs.length > 1 ? "s" : ""}</span>
            </div>
            <p className="muted" style={{ margin: "5px 0 0", fontSize: "var(--fs-sm)", maxWidth: 560, textWrap: "pretty" }}>{desc}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flex: "none" }}>
            <div style={{ display: "flex", background: "var(--slate-2)", borderRadius: "var(--r-sm)", padding: 3, border: "1px solid var(--border)" }}>
              {[["grid", "grid"], ["list", "list"]].map(([m, ic]) => (
                <button key={m} onClick={() => setMode(m)} className="btn-icon" title={m === "grid" ? "Cartes" : "Liste"}
                  style={{ width: 30, height: 28, border: "none", borderRadius: "var(--r-xs)", cursor: "pointer", display: "grid", placeItems: "center",
                    background: mode === m ? "var(--surface)" : "transparent", color: mode === m ? "var(--text)" : "var(--text-subtle)", boxShadow: mode === m ? "var(--sh-xs)" : "none" }}>
                  <Icon name={ic} size={15} />
                </button>
              ))}
            </div>
            <button className={`btn btn-sm ${shared ? "btn-secondary" : "btn-primary"}`} onClick={() => setShared(true)}>
              <Icon name="share" size={14} /> {shared ? "Partagé à l'équipe" : "Partager la vue"}
            </button>
          </div>
        </div>

        {/* recipe = filters bar */}
        <div className="card" style={{ padding: "12px 15px", marginBottom: 20, background: "var(--slate-2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>
              <Icon name="folderOff" size={14} /> Cette vue =
            </span>
            {recipe.length === 0 && <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>tous tes documents{base.note ? ` · ${base.note}` : ""}</span>}
            {recipe.map((c, i) => <Chip key={i} tag={{ label: c.label, color: c.color }} removable onRemove={() => removeChip(i)} />)}
            <div style={{ position: "relative" }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setAddOpen((o) => !o)} style={{ height: 24, border: "1px dashed var(--border-strong)", borderRadius: "var(--r-full)", color: "var(--text-muted)" }}>
                <Icon name="plus" size={13} /> Ajouter un filtre
              </button>
              {addOpen && (
                <div className="anim-pop" style={{ position: "absolute", top: "calc(100% + 7px)", left: 0, zIndex: 40, width: 260, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-pop)", padding: 8, maxHeight: 320, overflowY: "auto" }}>
                  {ADD_MENU.map((g) => (
                    <div key={g.group} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: ".04em", padding: "2px 6px 5px" }}>{g.group}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "0 4px" }}>
                        {g.opts.map((o) => (
                          <span key={o.value} onClick={() => addChip({ kind: g.kind, value: o.value, label: `${g.group} : ${o.label}`, color: o.color })}>
                            <Chip tag={{ label: o.label, color: o.color }} />
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: 6 }}>
              Modifie les filtres : la vue se recompose en direct.
            </span>
          </div>
        </div>

        {/* shared confirmation */}
        {shared && (
          <div className="anim-up" style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 15px", marginBottom: 18, background: "var(--tag-green-bg)", borderRadius: "var(--r-md)", fontSize: "var(--fs-sm)", color: "var(--tag-green-fg)" }}>
            <Icon name="checkCircle" size={17} />
            <span style={{ flex: 1 }}>Vue partagée — l'équipe verra toujours la version filtrée à jour, sans rien déplacer.</span>
            <AvatarStack ids={team} size={24} />
          </div>
        )}

        {/* docs */}
        {docs.length === 0 ? (
          <div className="card"><EmptyState icon="folderOff" title="Aucun document ne correspond" body="Cette combinaison de filtres est vide. Retire un filtre pour élargir la vue." /></div>
        ) : mode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(258px, 1fr))", gap: "var(--gap)" }}>
            {docs.map((d) => <DocCard key={d.id} doc={d} onOpen={onOpenDoc} onTag={onTag} />)}
          </div>
        ) : (
          <div className="card" style={{ padding: 6 }}>
            {docs.map((d) => <DocRow key={d.id} doc={d} onOpen={onOpenDoc} onTag={onTag} />)}
          </div>
        )}
      </div>
    </div>
  );
}

window.ViewScreen = ViewScreen;
