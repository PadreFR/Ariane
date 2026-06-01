/* screen-search.jsx — Résultats de recherche sémantique + filtres dynamiques */
const { useState: useStateSR, useMemo: useMemoSR } = React;

function FilterGroup({ title, items, selected, onToggle }) {
  const [open, setOpen] = useStateSR(true);
  if (!items.length) return null;
  return (
    <div style={{ borderBottom: "1px solid var(--border-faint)", padding: "12px 0" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", border: "none", background: "none", cursor: "pointer", padding: 0, marginBottom: open ? 9 : 0 }}>
        <span style={{ fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>{title}</span>
        <Icon name="chevronDown" size={14} style={{ color: "var(--text-subtle)", transform: open ? "none" : "rotate(-90deg)", transition: "transform .15s" }} />
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((it) => {
            const on = selected.includes(it.key);
            return (
              <label key={it.key} style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 6px", borderRadius: "var(--r-xs)", cursor: "pointer", background: on ? "var(--slate-2)" : "transparent" }}>
                <span style={{ width: 16, height: 16, borderRadius: 5, border: `1.5px solid ${on ? "var(--ink)" : "var(--border-strong)"}`, background: on ? "var(--ink)" : "var(--surface)", display: "grid", placeItems: "center", flex: "none", transition: "all .12s" }}>
                  {on && <Icon name="check" size={11} stroke={2.4} style={{ color: "#fff" }} />}
                </span>
                <input type="checkbox" checked={on} onChange={() => onToggle(it.key)} hidden />
                {it.dot && <span style={{ width: 7, height: 7, borderRadius: "50%", background: it.dot, flex: "none" }} />}
                <span style={{ flex: 1, fontSize: "var(--fs-sm)", color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.label}</span>
                <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>{it.count}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

const tagColorVar = (c) => `var(--tag-${c || "gray"}-dot)`;

function Search({ query, onSearch, onOpenDoc, onTag, onSaveView }) {
  const base = useMemoSR(() => runSearch(query), [query]);
  const [filters, setFilters] = useStateSR({ type: [], tag: [], person: [], status: [], conf: [] });
  const [saved, setSaved] = useStateSR(false);

  const toggle = (group, key) => {
    setFilters((f) => ({ ...f, [group]: f[group].includes(key) ? f[group].filter((k) => k !== key) : [...f[group], key] }));
    setSaved(false);
  };
  const clearAll = () => setFilters({ type: [], tag: [], person: [], status: [], conf: [] });
  const activeCount = Object.values(filters).reduce((a, b) => a + b.length, 0);

  // facets from base results
  const facets = useMemoSR(() => {
    const mk = () => ({});
    const types = mk(), tags = mk(), persons = mk(), status = mk(), conf = mk();
    base.forEach(({ doc }) => {
      types[doc.type] = (types[doc.type] || 0) + 1;
      doc.tags.forEach((tg) => { tags[tg.label] = tags[tg.label] || { count: 0, color: tg.color }; tags[tg.label].count++; });
      [doc.owner, ...doc.shared].forEach((p) => { persons[p] = (persons[p] || 0) + 1; });
      status[doc.status.label] = status[doc.status.label] || { count: 0, color: doc.status.color }; status[doc.status.label].count++;
      conf[doc.conf.label] = (conf[doc.conf.label] || 0) + 1;
    });
    return {
      type: Object.entries(types).map(([k, c]) => ({ key: k, label: TYPES[k].label, count: c })),
      tag: Object.entries(tags).map(([k, v]) => ({ key: k, label: k, count: v.count, dot: tagColorVar(v.color) })),
      person: Object.entries(persons).map(([k, c]) => ({ key: k, label: PEOPLE[k] ? PEOPLE[k].name : k, count: c, dot: PEOPLE[k] ? PEOPLE[k].color : "var(--slate-8)" })),
      status: Object.entries(status).map(([k, v]) => ({ key: k, label: k, count: v.count, dot: tagColorVar(v.color) })),
      conf: Object.entries(conf).map(([k, c]) => ({ key: k, label: k, count: c })),
    };
  }, [base]);

  // apply filters
  const results = useMemoSR(() => base.filter(({ doc }) => {
    if (filters.type.length && !filters.type.includes(doc.type)) return false;
    if (filters.tag.length && !doc.tags.some((tg) => filters.tag.includes(tg.label))) return false;
    if (filters.person.length && ![doc.owner, ...doc.shared].some((p) => filters.person.includes(p))) return false;
    if (filters.status.length && !filters.status.includes(doc.status.label)) return false;
    if (filters.conf.length && !filters.conf.includes(doc.conf.label)) return false;
    return true;
  }), [base, filters]);

  return (
    <div className="screen-scroll">
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px var(--header-pad) 60px" }}>

        {/* search bar */}
        <div style={{ maxWidth: 760, marginBottom: 8 }}>
          <SearchBar size="compact-hero" onSearch={onSearch} defaultValue={query} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
          <Icon name="sparkles" size={14} style={{ color: "var(--ink)" }} />
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>{results.length}</strong> résultat{results.length > 1 ? "s" : ""} pour <span style={{ color: "var(--text)" }}>« {query} »</span> — classés par pertinence
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "230px 1fr", gap: 28, alignItems: "start" }}>

          {/* filters */}
          <aside className="search-filters" style={{ position: "sticky", top: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "var(--fs-sm)", fontWeight: 600 }}><Icon name="filter" size={15} /> Affiner</span>
              {activeCount > 0 && <button className="btn btn-ghost btn-sm" onClick={clearAll} style={{ height: 22, padding: "0 6px" }}>Tout effacer</button>}
            </div>
            <p className="muted" style={{ fontSize: "var(--fs-xs)", margin: "0 0 4px", lineHeight: 1.4 }}>
              Un « dossier » n'est qu'une combinaison de filtres. Coche pour la composer.
            </p>
            <FilterGroup title="Type" items={facets.type} selected={filters.type} onToggle={(k) => toggle("type", k)} />
            <FilterGroup title="Tags" items={facets.tag} selected={filters.tag} onToggle={(k) => toggle("tag", k)} />
            <FilterGroup title="Personne" items={facets.person} selected={filters.person} onToggle={(k) => toggle("person", k)} />
            <FilterGroup title="Statut" items={facets.status} selected={filters.status} onToggle={(k) => toggle("status", k)} />
            <FilterGroup title="Confidentialité" items={facets.conf} selected={filters.conf} onToggle={(k) => toggle("conf", k)} />
          </aside>

          {/* results */}
          <div>
            {/* save as view bar */}
            <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 15px", marginBottom: 16, background: "var(--slate-2)", borderStyle: "dashed" }}>
              <Icon name="layers" size={17} style={{ color: "var(--ink)", flex: "none" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>Transforme cette recherche en vue dynamique</div>
                <div className="muted" style={{ fontSize: "var(--fs-xs)" }}>{activeCount > 0 ? `${query} + ${activeCount} filtre${activeCount > 1 ? "s" : ""}` : query} — réutilisable et partageable</div>
              </div>
              <button className={`btn btn-sm ${saved ? "btn-secondary" : "btn-primary"}`} onClick={() => { setSaved(true); }}>
                {saved ? <><Icon name="check" size={14} /> Vue enregistrée</> : <><Icon name="plus" size={14} /> Enregistrer la vue</>}
              </button>
            </div>

            {results.length === 0 ? (
              <div className="card"><EmptyState icon="search" title="Aucun résultat avec ces filtres" body="Essaie de retirer un filtre ou de reformuler ta recherche en langage naturel." cta="Effacer les filtres" onCta={clearAll} /></div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {results.map(({ doc, hits }, idx) => (
                  <SearchResult key={doc.id} doc={doc} hits={hits} rank={idx} query={query} onOpen={onOpenDoc} onTag={onTag} filters={filters} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchResult({ doc, hits, rank, onOpen, onTag, filters }) {
  const meta = TYPES[doc.type];
  const parts = highlightExcerpt(doc.excerpt, hits);
  return (
    <div className="card doc-result anim-up" onClick={() => onOpen(doc.id)}
      style={{ padding: "15px 17px", cursor: "pointer", display: "flex", gap: 14, animationDelay: `${rank * 0.04}s`, transition: "box-shadow .16s, border-color .16s" }}>
      <DocTile type={doc.type} size={40} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <h3 className="t-title" style={{ margin: 0, fontSize: "calc(var(--fs-base) + 1px)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.title}</h3>
          {doc.starred && <Icon name="star" size={14} style={{ color: "var(--tag-amber-dot)", fill: "var(--tag-amber-dot)", flex: "none" }} />}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "var(--fs-xs)", color: "var(--text-subtle)", marginBottom: 9, flexWrap: "wrap" }}>
          <span>{meta.label}</span><span>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Avatar id={doc.owner} size={16} /> {PEOPLE[doc.owner].name}</span><span>·</span>
          <span>{doc.dateLabel}</span><span>·</span>
          <ConfBadge conf={doc.conf} />
        </div>

        {/* why this matches */}
        <div style={{ background: "var(--slate-2)", border: "1px solid var(--border-faint)", borderRadius: "var(--r-sm)", padding: "9px 11px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--fs-xs)", color: "var(--ink)", fontWeight: 500, marginBottom: 4 }}>
            <Icon name="sparkles" size={12} /> Pourquoi ce résultat
          </div>
          <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.5, color: "var(--text-muted)" }}>
            {parts.map((p, i) => p.hl
              ? <mark key={i} style={{ background: "rgba(217,154,43,.28)", color: "var(--text)", borderRadius: 3, padding: "0 2px", fontWeight: 500 }}>{p.text}</mark>
              : <span key={i}>{p.text}</span>)}
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <Chip tag={{ ...doc.status }} onClick={(e) => { e.stopPropagation(); onTag(doc.status); }} />
          {doc.tags.map((tg, i) => {
            const matched = filters && (filters.tag || []).includes(tg.label);
            return <span key={i} style={matched ? { boxShadow: "0 0 0 2px var(--ink)", borderRadius: 999 } : {}}><Chip tag={tg} onClick={(e) => { e.stopPropagation(); onTag(tg); }} /></span>;
          })}
        </div>
      </div>
      <Icon name="arrowRight" size={17} style={{ color: "var(--slate-8)", flex: "none", alignSelf: "center" }} />
    </div>
  );
}

window.Search = Search;
