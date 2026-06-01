/* searchbar.jsx — natural language search with live suggestions */
const { useState: useStateSB, useRef: useRefSB, useEffect: useEffectSB } = React;

function SearchBar({ size = "hero", onSearch, defaultValue = "", autoFocus = false }) {
  const [q, setQ] = useStateSB(defaultValue);
  const [open, setOpen] = useStateSB(false);
  const [active, setActive] = useStateSB(-1);
  const [rotIdx, setRotIdx] = useStateSB(0);
  const wrapRef = useRefSB(null);
  const inputRef = useRefSB(null);

  const sugg = q.trim() ? searchSuggestions(q) : [];
  const showExamples = !q.trim();
  const items = q.trim() ? sugg : EXAMPLE_QUERIES.map((text) => ({ kind: "query", text }));

  // rotating placeholder
  const placeholders = [
    "Décris le document que tu cherches…",
    "« le contrat signé en mars avec Meridian »",
    "« la dernière version du budget 2026 »",
    "« les CR de la refonte SI »",
  ];
  useEffectSB(() => {
    if (size !== "hero") return;
    const t = setInterval(() => setRotIdx((i) => (i + 1) % placeholders.length), 3200);
    return () => clearInterval(t);
  }, [size]);

  useEffectSB(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  useEffectSB(() => {
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const submit = (text) => {
    const query = text != null ? text : q;
    if (!query.trim()) return;
    setQ(query); setOpen(false);
    onSearch && onSearch(query);
  };

  const onKey = (e) => {
    if (!open) { if (e.key === "Enter") submit(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && items[active]) submit(items[active].text);
      else submit();
    } else if (e.key === "Escape") setOpen(false);
  };

  const isHero = size === "hero";

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <div className="search-shell" data-hero={isHero}
        style={{
          display: "flex", alignItems: "center", gap: isHero ? 14 : 10,
          background: "var(--surface)", border: "1px solid var(--border-strong)",
          borderRadius: isHero ? "var(--r-lg)" : "var(--r-sm)",
          height: isHero ? 60 : 38, padding: isHero ? "0 18px" : "0 11px",
          boxShadow: open ? "var(--sh-md), var(--ring)" : (isHero ? "var(--sh-sm)" : "var(--sh-xs)"),
          transition: "box-shadow .16s, border-color .16s",
          borderColor: open ? "var(--slate-9)" : "var(--border-strong)",
        }}>
        <Icon name="sparkles" size={isHero ? 22 : 16} style={{ color: open || q ? "var(--ink)" : "var(--slate-9)", transition: "color .16s" }} />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={isHero ? placeholders[rotIdx] : "Rechercher…"}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontSize: isHero ? 17 : "var(--fs-sm)", color: "var(--text)",
            letterSpacing: isHero ? "-0.01em" : 0, fontWeight: isHero ? 450 : 400,
          }}
        />
        {q && (
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => { setQ(""); inputRef.current && inputRef.current.focus(); }} style={{ color: "var(--text-subtle)" }}>
            <Icon name="x" size={15} />
          </button>
        )}
        {isHero && (
          <button className="btn btn-primary" style={{ height: 40 }} onClick={() => submit()}>
            Rechercher <Icon name="return" size={14} />
          </button>
        )}
      </div>

      {open && items.length > 0 && (
        <div className="search-pop anim-pop" style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 60,
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-md)",
          boxShadow: "var(--sh-pop)", padding: 6, overflow: "hidden",
        }}>
          {showExamples && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 10px 6px", color: "var(--text-subtle)", fontSize: "var(--fs-xs)", fontWeight: 500 }}>
              <Icon name="sparkles" size={13} /> Essaie une recherche en langage naturel
            </div>
          )}
          {items.map((it, i) => (
            <div key={i}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); submit(it.text); }}
              style={{
                display: "flex", alignItems: "center", gap: 11, padding: "9px 10px",
                borderRadius: "var(--r-sm)", cursor: "pointer",
                background: active === i ? "var(--slate-3)" : "transparent",
              }}>
              <Icon name={it.kind === "entity" ? "tag" : "search"} size={15} style={{ color: "var(--text-subtle)", flex: "none" }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.text}</div>
                {it.sub && <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>{it.sub}</div>}
              </div>
              {active === i && <Icon name="return" size={14} style={{ color: "var(--slate-8)", flex: "none" }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.SearchBar = SearchBar;
