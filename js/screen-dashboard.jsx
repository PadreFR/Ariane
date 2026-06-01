/* screen-dashboard.jsx — Accueil / Tableau de bord */
const { useState: useStateDB } = React;

function ViewCard({ view, onOpen }) {
  const docs = viewDocs(view);
  return (
    <button className="card view-card" onClick={() => onOpen(view)}
      style={{ textAlign: "left", cursor: "pointer", padding: "var(--pad-card)", display: "flex", flexDirection: "column", gap: 10, background: "var(--surface)", transition: "box-shadow .16s, border-color .16s, transform .12s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", background: "var(--slate-3)", display: "grid", placeItems: "center", color: "var(--ink)" }}>
          <Icon name={view.icon} size={17} stroke={1.6} />
        </span>
        <span className="mono" style={{ fontSize: "var(--fs-sm)", color: "var(--text-subtle)", fontWeight: 500 }}>{docs.length}</span>
      </div>
      <div>
        <div className="t-title" style={{ fontSize: "var(--fs-base)" }}>{view.label}</div>
        <div className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: 2, lineHeight: 1.4, textWrap: "pretty" }}>{view.desc}</div>
      </div>
    </button>
  );
}

function ViewTabs({ onOpen, navigate, onTag }) {
  const [active, setActive] = useStateDB(VIEWS[0].id);
  const view = VIEWS.find((v) => v.id === active);
  const docs = viewDocs(view).slice(0, 5);
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 2, padding: 6, borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
        {VIEWS.map((v) => {
          const n = viewDocs(v).length;
          const on = v.id === active;
          return (
            <button key={v.id} onClick={() => setActive(v.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", borderRadius: "var(--r-sm)", border: "none", cursor: "pointer", whiteSpace: "nowrap",
                background: on ? "var(--ink)" : "transparent", color: on ? "#fff" : "var(--text-muted)", fontSize: "var(--fs-sm)", fontWeight: 500, transition: "background .14s, color .14s" }}>
              <Icon name={v.icon} size={15} /> {v.label}
              <span style={{ fontSize: "var(--fs-xs)", opacity: .7 }}>{n}</span>
            </button>
          );
        })}
      </div>
      <div style={{ padding: 6 }}>
        {docs.map((d) => <DocRow key={d.id} doc={d} onOpen={onOpen} onTag={onTag} />)}
      </div>
      <div style={{ padding: "4px 14px 12px" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => onOpen(view)}>Ouvrir la vue « {view.label} » <Icon name="arrowRight" size={13} /></button>
      </div>
    </div>
  );
}

function SuggestionCard({ s, onOpen }) {
  const doc = docById(s.id);
  return (
    <div className="card sugg-card" onClick={() => onOpen(s.id)}
      style={{ padding: "13px 14px", cursor: "pointer", display: "flex", gap: 11, alignItems: "flex-start", transition: "box-shadow .16s, border-color .16s" }}>
      <span style={{ width: 30, height: 30, borderRadius: "var(--r-sm)", background: "var(--slate-3)", display: "grid", placeItems: "center", color: "var(--ink)", flex: "none" }}>
        <Icon name={s.icon} size={16} />
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
        <div className="t-title" style={{ fontSize: "var(--fs-sm)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.title}</div>
        <div className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: 3, lineHeight: 1.4, textWrap: "pretty" }}>{s.reason}</div>
      </div>
    </div>
  );
}

function DropZone({ onUpload, big }) {
  const [over, setOver] = useStateDB(false);
  const inputRef = React.useRef(null);
  const handle = (name) => onUpload(name || "Document.pdf");
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files[0]; handle(f ? f.name : null); }}
      onClick={() => inputRef.current && inputRef.current.click()}
      className="dropzone"
      style={{
        border: `1.5px dashed ${over ? "var(--ink)" : "var(--border-strong)"}`,
        background: over ? "var(--slate-2)" : "var(--surface-2)",
        borderRadius: "var(--r-lg)", padding: big ? "26px 24px" : "18px 20px",
        display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
        transition: "border-color .16s, background .16s, transform .12s",
        transform: over ? "scale(1.005)" : "none",
      }}>
      <input ref={inputRef} type="file" hidden onChange={(e) => { const f = e.target.files[0]; handle(f ? f.name : null); }} />
      <span style={{ width: big ? 48 : 40, height: big ? 48 : 40, borderRadius: "var(--r-md)", background: over ? "var(--ink)" : "var(--slate-3)", color: over ? "#fff" : "var(--ink)", display: "grid", placeItems: "center", flex: "none", transition: "background .16s, color .16s" }}>
        <Icon name="upload" size={big ? 22 : 19} />
      </span>
      <div style={{ flex: 1 }}>
        <div className="t-title" style={{ fontSize: "var(--fs-base)" }}>{over ? "Lâche ici — Ariane s'occupe du reste" : "Dépose un document"}</div>
        <div className="muted" style={{ fontSize: "var(--fs-sm)", marginTop: 2 }}>
          Glisse un fichier, on le tague et on le classe automatiquement. <span style={{ color: "var(--text)", fontWeight: 500 }}>Aucun dossier à choisir.</span>
        </div>
      </div>
      <span className="dz-hint" style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", border: "1px solid var(--border)", borderRadius: "var(--r-full)", padding: "4px 11px", whiteSpace: "nowrap" }}>
        ou parcourir
      </span>
    </div>
  );
}

function Dashboard({ navigate, onSearch, onOpenDoc, onOpenView, onTag, onUpload, viewsMode }) {
  const greet = (() => { const h = 10; return h < 12 ? "Bonjour" : "Bonsoir"; })();
  return (
    <div className="screen-scroll">
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 var(--header-pad) 60px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "44px 0 26px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--fs-xs)", color: "var(--text-muted)", background: "var(--slate-3)", padding: "5px 12px", borderRadius: "var(--r-full)", marginBottom: 18 }}>
            <Icon name="folderOff" size={13} /> Pas de dossiers. Pas de rangement. Juste retrouver.
          </div>
          <h1 className="t-display" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", margin: "0 0 8px" }}>{greet}, Guillaume.</h1>
          <p className="muted" style={{ margin: "0 auto 26px", fontSize: "calc(var(--fs-base) + 1px)", maxWidth: 460, textWrap: "balance" }}>
            Décris ce que tu cherches en une phrase — comme tu le dirais à un collègue.
          </p>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <SearchBar size="hero" onSearch={onSearch} autoFocus />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 16 }}>
            {EXAMPLE_QUERIES.slice(0, 3).map((ex, i) => (
              <button key={i} className="example-chip" onClick={() => onSearch(ex)}
                style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-full)", padding: "6px 13px", cursor: "pointer", transition: "background .14s, border-color .14s", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon name="search" size={12} style={{ color: "var(--text-subtle)" }} /> {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Drop band */}
        <div style={{ margin: "8px 0 36px" }}>
          <DropZone onUpload={onUpload} big />
        </div>

        {/* Views */}
        <section style={{ marginBottom: 38 }}>
          <SectionHeader icon="layers" title="Tes vues" sub="Des filtres, pas des dossiers" />
          {viewsMode === "tabs"
            ? <ViewTabs onOpen={onOpenView} navigate={navigate} onTag={onTag} />
            : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "var(--gap)" }}>
                {VIEWS.map((v) => <ViewCard key={v.id} view={v} onOpen={onOpenView} />)}
              </div>
            )}
        </section>

        {/* Suggestions */}
        <section>
          <SectionHeader icon="sparkles" title="Suggestions" sub="Ce qu'Ariane a remarqué pour toi" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--gap)", marginBottom: "var(--gap)" }}>
            {SUGGESTIONS.map((s) => <SuggestionCard key={s.id} s={s} onOpen={onOpenDoc} />)}
          </div>
          {/* duplicate detection banner */}
          <div className="card" style={{ padding: "13px 16px", display: "flex", alignItems: "center", gap: 13, borderColor: "var(--tag-amber-bg)", background: "var(--tag-amber-bg)" }}>
            <span style={{ width: 30, height: 30, borderRadius: "var(--r-sm)", background: "#fff", color: "var(--tag-amber-fg)", display: "grid", placeItems: "center", flex: "none" }}>
              <Icon name="copy" size={16} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="t-title" style={{ fontSize: "var(--fs-sm)", color: "var(--tag-amber-fg)" }}>Doublon possible détecté</div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--tag-amber-fg)", opacity: .85, marginTop: 1 }}>{DUPLICATE.note}</div>
            </div>
            <button className="btn btn-sm" style={{ background: "#fff", color: "var(--tag-amber-fg)", border: "1px solid rgba(149,98,12,.2)" }} onClick={() => onOpenDoc(DUPLICATE.b)}>Comparer</button>
          </div>
        </section>

      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
