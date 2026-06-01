/* app.jsx — shell, routing, tweaks */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const ACCENTS = {
  "Encre":       { ink: "#11181c", hover: "#2a3439" },
  "Indigo":      { ink: "#3b3bb0", hover: "#2f2f93" },
  "Vert sapin":  { ink: "#16624a", hover: "#0f4e3a" },
  "Ardoise":     { ink: "#3a4a5a", hover: "#2b3744" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "airy",
  "typeface": "geist",
  "viewsMode": "cards",
  "accent": "Encre"
}/*EDITMODE-END*/;

// ---- Sidebar ----
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className="nav-item"
      style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "8px 10px", border: "none", borderRadius: "var(--r-sm)", cursor: "pointer", textAlign: "left",
        background: active ? "var(--slate-3)" : "transparent", color: active ? "var(--text)" : "var(--text-muted)", fontSize: "var(--fs-sm)", fontWeight: active ? 500 : 450, transition: "background .12s, color .12s" }}>
      <Icon name={icon} size={17} stroke={1.6} style={{ color: active ? "var(--ink)" : "var(--text-subtle)", flex: "none" }} />
      <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      {badge != null && <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", fontWeight: 500 }}>{badge}</span>}
    </button>
  );
}

function Sidebar({ route, navigate, onUpload }) {
  const is = (s, id) => route.screen === s && (id == null || route.params?.viewId === id);
  return (
    <aside className="sidebar" style={{ width: 236, flex: "none", background: "var(--bg-sunken)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "16px 12px", height: "100%" }}>
      {/* brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 18px" }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center", flex: "none" }}>
          <Icon name="thread" size={18} stroke={1.8} />
        </span>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>Ariane</div>
          <div style={{ fontSize: 10.5, color: "var(--text-subtle)", marginTop: 2 }}>Le fil qui retrouve tout</div>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: "100%", height: 38, marginBottom: 16, justifyContent: "center" }} onClick={() => onUpload()}>
        <Icon name="upload" size={16} /> Déposer un document
      </button>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <NavItem icon="home" label="Accueil" active={route.screen === "dashboard"} onClick={() => navigate("dashboard")} />
        <NavItem icon="search" label="Recherche" active={route.screen === "search"} onClick={() => navigate("search", { query: "documents en attente de signature" })} />
        <NavItem icon="inbox" label="À traiter" active={false} onClick={() => navigate("view", { viewId: "pending" })} badge={viewDocs(VIEWS[2]).length} />
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "20px 10px 8px" }}>
        <div style={{ flex: 1, fontSize: 10.5, fontWeight: 600, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: ".05em" }}>Mes vues</div>
        <button className="btn btn-ghost btn-icon btn-sm" title="Créer une vue" onClick={() => navigate("create-view")} style={{ width: 24, height: 24 }}>
          <Icon name="plus" size={13} />
        </button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {VIEWS.map((v) => (
          <NavItem key={v.id} icon={v.icon} label={v.label} active={is("view", v.id)} onClick={() => navigate("view", { viewId: v.id })} badge={viewDocs(v).length} />
        ))}
        <NavItem icon="building" label="Contrats Meridian" active={is("view", "meridian")} onClick={() => navigate("view", { viewId: "meridian" })} badge={4} />
      </nav>

      <div style={{ flex: 1 }} />
      <div className="hr" style={{ margin: "12px 0" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px" }}>
        <Avatar id="cp" size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--fs-sm)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Guillaume Tirocco</div>
          <div style={{ fontSize: 10.5, color: "var(--text-subtle)" }}>Direction</div>
        </div>
        <button className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--text-subtle)" }}><Icon name="settings" size={16} /></button>
      </div>
    </aside>
  );
}

function TopBar({ route, navigate, onSearch }) {
  const titles = { search: "Recherche", view: "Vue dynamique", detail: "Document", upload: "Dépôt" };
  if (route.screen === "dashboard" || route.screen === "upload") {
    return (
      <header className="topbar" style={{ height: 56, flex: "none", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, padding: "0 var(--header-pad)", background: "var(--bg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
          <Icon name={route.screen === "upload" ? "upload" : "home"} size={16} />
          <span style={{ color: "var(--text)", fontWeight: 500 }}>{route.screen === "upload" ? "Dépôt d'un document" : "Accueil"}</span>
        </div>
        <div style={{ flex: 1 }} />
        {route.screen === "dashboard" && (
          <button className="btn btn-secondary btn-sm" onClick={() => navigate("create-view")}>
            <Icon name="plus" size={14} /> Créer une vue
          </button>
        )}
        <button className="btn btn-ghost btn-icon"><Icon name="bell" size={18} /></button>
      </header>
    );
  }
  return (
    <header className="topbar" style={{ height: 56, flex: "none", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, padding: "0 var(--header-pad)", background: "var(--bg)" }}>
      <div style={{ width: 360, maxWidth: "40%" }}>
        <SearchBar size="compact" onSearch={(q) => onSearch(q)} defaultValue={route.screen === "search" ? route.params.query : ""} />
      </div>
      <div style={{ flex: 1 }} />
      <button className="btn btn-ghost btn-icon"><Icon name="bell" size={18} /></button>
    </header>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useStateApp({ screen: "dashboard", params: {} });
  const [history, setHistory] = useStateApp([]);

  useEffectApp(() => {
    const r = document.documentElement;
    r.setAttribute("data-density", t.density);
    r.setAttribute("data-type", t.typeface);
    const a = ACCENTS[t.accent] || ACCENTS["Encre"];
    r.style.setProperty("--ink", a.ink);
    r.style.setProperty("--ink-hover", a.hover);
    r.style.setProperty("--accent", a.ink);
  }, [t]);

  const navigate = (screen, params = {}) => {
    setHistory((h) => [...h, route]);
    setRoute({ screen, params });
    const sc = document.querySelector(".screen-scroll");
  };
  const back = () => {
    setHistory((h) => { if (!h.length) { setRoute({ screen: "dashboard", params: {} }); return []; } const prev = h[h.length - 1]; setRoute(prev); return h.slice(0, -1); });
  };

  const onSearch = (query) => navigate("search", { query });
  const onOpenDoc = (id) => navigate("detail", { docId: id });
  const onOpenView = (view) => navigate("view", { viewId: view.id });
  const onUpload = (filename) => navigate("upload", { filename });
  const onTag = (tag) => navigate("search", { query: tag.label });

  let screen;
  if (route.screen === "dashboard") screen = <Dashboard navigate={navigate} onSearch={onSearch} onOpenDoc={onOpenDoc} onOpenView={onOpenView} onTag={onTag} onUpload={onUpload} viewsMode={t.viewsMode} />;
  else if (route.screen === "upload") screen = <Upload filename={route.params.filename} onSave={() => navigate("view", { viewId: "recents" })} onCancel={back} />;
  else if (route.screen === "search") screen = <Search query={route.params.query} onSearch={onSearch} onOpenDoc={onOpenDoc} onTag={onTag} />;
  else if (route.screen === "detail") screen = <Detail docId={route.params.docId} onBack={back} onOpenDoc={onOpenDoc} onTag={onTag} navigate={navigate} />;
  else if (route.screen === "view") screen = <ViewScreen viewId={route.params.viewId} viewMode={t.viewsMode} onOpenDoc={onOpenDoc} onTag={onTag} navigate={navigate} onBack={() => navigate("dashboard")} />;
  else if (route.screen === "create-view") screen = <CreateView navigate={navigate} onOpenDoc={onOpenDoc} onTag={onTag} onCancel={back} />;

  return (
    <div className="app" style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar route={route} navigate={navigate} onUpload={onUpload} />
      <main className="main" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <TopBar route={route} navigate={navigate} onSearch={onSearch} />
        <div key={route.screen + JSON.stringify(route.params)} className="screen-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {screen}
        </div>
      </main>

      <TweaksPanel>
        <TweakSection label="Densité" />
        <TweakRadio label="Espacement" value={t.density} options={[{ value: "airy", label: "Aéré" }, { value: "compact", label: "Compact" }]} onChange={(v) => setTweak("density", v)} />
        <TweakSection label="Typographie" />
        <TweakSelect label="Police" value={t.typeface} options={[{ value: "geist", label: "Geist" }, { value: "hanken", label: "Hanken Grotesk" }, { value: "schibsted", label: "Schibsted Grotesk" }]} onChange={(v) => setTweak("typeface", v)} />
        <TweakSection label="Vues dynamiques" />
        <TweakRadio label="Présentation" value={t.viewsMode} options={[{ value: "cards", label: "Cartes" }, { value: "tabs", label: "Onglets" }]} onChange={(v) => setTweak("viewsMode", v)} />
        <TweakSection label="Accent" />
        <TweakColor label="Couleur" value={ACCENTS[t.accent].ink} options={Object.values(ACCENTS).map((a) => a.ink)}
          onChange={(hex) => { const name = Object.keys(ACCENTS).find((k) => ACCENTS[k].ink === hex) || "Encre"; setTweak("accent", name); }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
