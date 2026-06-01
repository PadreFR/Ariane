/* screen-create-view.jsx — Création simulée d'une vue dynamique */
const { useState: useStateCV, useMemo: useMemoCV } = React;

const CREATE_VIEW_GROUPS = [
  { group: "Type", kind: "type", icon: "fileText", opts: Object.entries(TYPES).map(([k, m]) => ({ value: k, label: m.label, color: "blue" })) },
  { group: "Statut", kind: "status", icon: "checkCircle", opts: [["Signé", "green"], ["Validé", "green"], ["En attente", "amber"], ["À relire", "amber"], ["Brouillon", "gray"]].map(([v, c]) => ({ value: v, label: v, color: c })) },
  { group: "Confidentialité", kind: "conf", icon: "lock", opts: [["Public", "teal"], ["Interne", "gray"], ["Confidentiel", "red"], ["Restreint", "red"]].map(([v, c]) => ({ value: v, label: v, color: c })) },
  { group: "Tag", kind: "tag", icon: "tag", opts: ["Projet Atlas", "Refonte SI", "Budget 2026", "Meridian", "Télétravail", "RH", "Finance", "À signer"].map((v) => ({ value: v, label: v, color: v === "Meridian" || v === "À signer" ? "amber" : "violet" })) },
  { group: "Personne", kind: "person", icon: "user", opts: Object.values(PEOPLE).map((p) => ({ value: p.id, label: p.name, color: "gray" })) },
];

function createViewMatch(doc, c) {
  switch (c.kind) {
    case "type": return doc.type === c.value;
    case "status": return doc.status.label === c.value;
    case "conf": return doc.conf.label === c.value;
    case "tag": return doc.tags.some((t) => t.label === c.value);
    case "person": return doc.owner === c.value || doc.shared.includes(c.value);
    default: return true;
  }
}

function createViewDocs(recipe) {
  const byKind = {};
  recipe.forEach((c) => { (byKind[c.kind] = byKind[c.kind] || []).push(c); });
  return DOCS.filter((doc) => Object.values(byKind).every((chips) => chips.some((c) => createViewMatch(doc, c))));
}

function CreateView({ navigate, onOpenDoc, onTag, onCancel }) {
  const [name, setName] = useStateCV("Contrats Meridian à suivre");
  const [desc, setDesc] = useStateCV("Contrats, avenants et documents en attente liés au client Meridian.");
  const [recipe, setRecipe] = useStateCV([
    { kind: "tag", value: "Meridian", label: "Tag : Meridian", color: "amber" },
    { kind: "status", value: "En attente", label: "Statut : En attente", color: "amber" },
  ]);
  const [shared, setShared] = useStateCV(true);
  const [saved, setSaved] = useStateCV(false);

  const docs = useMemoCV(() => createViewDocs(recipe), [recipe]);
  const addChip = (group, opt) => {
    const chip = { kind: group.kind, value: opt.value, label: `${group.group} : ${opt.label}`, color: opt.color };
    if (!recipe.find((c) => c.kind === chip.kind && c.value === chip.value)) setRecipe((r) => [...r, chip]);
  };
  const removeChip = (i) => setRecipe((r) => r.filter((_, j) => j !== i));
  const resetDemo = () => {
    setName("Contrats Meridian à suivre");
    setDesc("Contrats, avenants et documents en attente liés au client Meridian.");
    setRecipe([
      { kind: "tag", value: "Meridian", label: "Tag : Meridian", color: "amber" },
      { kind: "status", value: "En attente", label: "Statut : En attente", color: "amber" },
    ]);
    setSaved(false);
  };

  return (
    <div className="screen-scroll">
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "22px var(--header-pad) 60px" }}>
        <button className="btn btn-ghost btn-sm" onClick={onCancel} style={{ marginBottom: 16 }}><Icon name="chevronLeft" size={15} /> Accueil</button>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
          <span style={{ width: 50, height: 50, borderRadius: "var(--r-md)", background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center", flex: "none" }}>
            <Icon name="layers" size={24} stroke={1.6} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="t-display" style={{ fontSize: 28, margin: 0 }}>Créer une vue dynamique</h1>
            <p className="muted" style={{ margin: "6px 0 0", maxWidth: 650, fontSize: "var(--fs-sm)", textWrap: "pretty" }}>
              Assemble des filtres. Ariane affiche automatiquement les documents qui correspondent, sans déplacer ni dupliquer de fichier.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flex: "none" }}>
            <button className="btn btn-secondary btn-sm" onClick={resetDemo}><Icon name="filter" size={14} /> Exemple</button>
            <button className="btn btn-primary btn-sm" onClick={() => setSaved(true)} disabled={!name.trim()}>
              <Icon name="check" size={14} /> Enregistrer
            </button>
          </div>
        </div>

        {saved && (
          <div className="anim-up" style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 15px", marginBottom: 18, background: "var(--tag-green-bg)", borderRadius: "var(--r-md)", fontSize: "var(--fs-sm)", color: "var(--tag-green-fg)" }}>
            <Icon name="checkCircle" size={17} />
            <span style={{ flex: 1 }}>Vue enregistrée dans la maquette — elle apparaîtrait dans “Mes vues” et se mettrait à jour dès qu'un document correspond.</span>
            <button className="btn btn-sm" style={{ background: "#fff", color: "var(--tag-green-fg)", border: "1px solid rgba(42,126,67,.18)" }} onClick={() => navigate("view", { viewId: "meridian" })}>Voir une vue similaire</button>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "320px minmax(0, 1fr)", gap: "var(--gap)", alignItems: "start" }}>
          <aside style={{ display: "flex", flexDirection: "column", gap: "var(--gap)", position: "sticky", top: 14 }}>
            <section className="card card-pad">
              <SectionHeader icon="fileText" title="Identité" sub="Nom et usage" />
              <label style={{ display: "block", fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>Nom de la vue</label>
              <input className="field" value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} />
              <label style={{ display: "block", fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontWeight: 600, margin: "14px 0 6px" }}>Description</label>
              <textarea className="field" value={desc} onChange={(e) => { setDesc(e.target.value); setSaved(false); }} style={{ height: 86, paddingTop: 9, resize: "none", lineHeight: 1.4 }} />
              <button className={`btn btn-sm ${shared ? "btn-secondary" : "btn-ghost"}`} onClick={() => setShared((v) => !v)} style={{ marginTop: 12 }}>
                <Icon name="share" size={14} /> {shared ? "Partagée avec l'équipe" : "Privée"}
              </button>
            </section>

            <section className="card card-pad">
              <SectionHeader icon="filter" title="Filtres" sub="Clique pour ajouter" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {CREATE_VIEW_GROUPS.map((g) => (
                  <div key={g.group}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10.5, fontWeight: 600, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7 }}>
                      <Icon name={g.icon} size={13} /> {g.group}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {g.opts.map((o) => {
                        const on = recipe.some((c) => c.kind === g.kind && c.value === o.value);
                        return (
                          <button key={o.value} className="btn btn-sm" onClick={() => { addChip(g, o); setSaved(false); }}
                            style={{ height: 26, borderRadius: "var(--r-full)", background: on ? "var(--ink)" : "var(--surface)", color: on ? "#fff" : "var(--text-muted)", border: "1px solid var(--border)", padding: "0 9px" }}>
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <main style={{ minWidth: 0 }}>
            <section className="card" style={{ padding: "14px 16px", marginBottom: "var(--gap)", background: "var(--slate-2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>
                  <Icon name="folderOff" size={14} /> Cette vue =
                </span>
                {recipe.length === 0 && <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>tous les documents</span>}
                {recipe.map((c, i) => <Chip key={`${c.kind}-${c.value}`} tag={{ label: c.label, color: c.color }} removable onRemove={() => { removeChip(i); setSaved(false); }} />)}
              </div>
            </section>

            <section style={{ marginBottom: 14 }}>
              <SectionHeader icon="eye" title={name.trim() || "Nouvelle vue"} sub={`${docs.length} document${docs.length > 1 ? "s" : ""} dans l'aperçu`} />
              {desc && <p className="muted" style={{ margin: "-6px 0 14px", fontSize: "var(--fs-sm)" }}>{desc}</p>}
              {docs.length === 0 ? (
                <div className="card"><EmptyState icon="folderOff" title="Aucun document dans cette vue" body="Retire un filtre ou choisis une combinaison plus large pour alimenter l'aperçu." /></div>
              ) : (
                <div className="card" style={{ padding: 6 }}>
                  {docs.slice(0, 7).map((d) => <DocRow key={d.id} doc={d} onOpen={onOpenDoc} onTag={onTag} />)}
                  {docs.length > 7 && (
                    <div style={{ padding: "9px 12px", color: "var(--text-subtle)", fontSize: "var(--fs-xs)" }}>+{docs.length - 7} autre{docs.length - 7 > 1 ? "s" : ""} document{docs.length - 7 > 1 ? "s" : ""}</div>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

window.CreateView = CreateView;
