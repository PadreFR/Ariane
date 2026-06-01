/* components.jsx — shared UI atoms + document displays */
const { useState, useRef, useEffect } = React;

// ---- Chip / tag ----
function Chip({ tag, onClick, removable, onRemove, dot = true, className = "" }) {
  const color = tag.color || "gray";
  return (
    <span className={`chip ${color} ${className}`} onClick={onClick} title={tag.kind ? `${tag.kind} : ${tag.label}` : tag.label}>
      {dot && <span className="dot" />}
      {tag.label}
      {removable && (
        <span className="x" onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }}><Icon name="x" size={12} /></span>
      )}
    </span>
  );
}

// ---- Avatar + stack ----
function Avatar({ id, size = 26, ring = true }) {
  const p = PEOPLE[id]; if (!p) return null;
  return (
    <span className="avatar" title={p.name}
      style={{ width: size, height: size, background: p.color, fontSize: size * 0.4, boxShadow: ring ? undefined : "none" }}>
      {p.initials}
    </span>
  );
}
function AvatarStack({ ids, size = 24, max = 4 }) {
  const shown = ids.slice(0, max); const extra = ids.length - shown.length;
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {shown.map((id, i) => (
        <span key={id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i, borderRadius: "50%", boxShadow: "0 0 0 2px var(--surface)" }}>
          <Avatar id={id} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span className="avatar" style={{ marginLeft: -8, width: size, height: size, fontSize: size * 0.36, background: "var(--slate-6)", color: "var(--slate-11)", boxShadow: "0 0 0 2px var(--surface)" }}>
          +{extra}
        </span>
      )}
    </span>
  );
}

// ---- Document type tile ----
function DocTile({ type, size = 38 }) {
  const meta = TYPES[type] || TYPES.note;
  return (
    <span className="doctile" style={{ width: size, height: size }}>
      <Icon name={meta.icon} size={size * 0.5} stroke={1.5} />
    </span>
  );
}

// ---- Confidentiality marker ----
function ConfBadge({ conf }) {
  const ic = conf.label === "Confidentiel" || conf.label === "Restreint" ? "lock" : conf.label === "Public" ? "globe" : "building";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--text-subtle)", fontSize: "var(--fs-xs)" }}>
      <Icon name={ic} size={13} /> {conf.label}
    </span>
  );
}

// ---- Document card (grid) ----
function DocCard({ doc, onOpen, onTag }) {
  const meta = TYPES[doc.type];
  return (
    <div className="card doc-card anim-up" onClick={() => onOpen(doc.id)}
      style={{ padding: "var(--pad-card)", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, transition: "box-shadow .16s, border-color .16s, transform .12s" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
        <DocTile type={doc.type} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-subtle)", fontSize: "var(--fs-xs)", marginBottom: 3 }}>
            <span>{meta.label}</span><span>·</span><span>{doc.dateLabel}</span>
          </div>
          <div className="t-title" style={{ fontSize: "calc(var(--fs-base) + 0.5px)", lineHeight: 1.3, textWrap: "pretty", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {doc.title}
          </div>
        </div>
        {doc.starred && <Icon name="star" size={15} style={{ color: "var(--tag-amber-dot)", fill: "var(--tag-amber-dot)" }} />}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <Chip tag={{ ...doc.status }} onClick={(e) => { e.stopPropagation(); onTag && onTag(doc.status); }} />
        {doc.tags.slice(0, 2).map((tg, i) => (
          <Chip key={i} tag={tg} onClick={(e) => { e.stopPropagation(); onTag && onTag(tg); }} />
        ))}
        {doc.tags.length > 2 && <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", alignSelf: "center" }}>+{doc.tags.length - 2}</span>}
      </div>
      <div className="hr" style={{ background: "var(--border-faint)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Avatar id={doc.owner} size={22} />
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{PEOPLE[doc.owner].name}</span>
        </div>
        <ConfBadge conf={doc.conf} />
      </div>
    </div>
  );
}

// ---- Document row (list) ----
function DocRow({ doc, onOpen, onTag, showOwner = true }) {
  const meta = TYPES[doc.type];
  return (
    <div className="doc-row" onClick={() => onOpen(doc.id)}
      style={{ display: "flex", alignItems: "center", gap: 13, padding: "0 12px", minHeight: "var(--row-h)", cursor: "pointer", borderRadius: "var(--r-sm)", transition: "background .12s" }}>
      <DocTile type={doc.type} size={34} />
      <div style={{ minWidth: 0, flex: "1 1 40%" }}>
        <div className="t-title" style={{ fontSize: "var(--fs-base)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 7 }}>
          {doc.title}
          {doc.starred && <Icon name="star" size={13} style={{ color: "var(--tag-amber-dot)", fill: "var(--tag-amber-dot)" }} />}
        </div>
        <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", display: "flex", gap: 6 }}>
          <span>{meta.label}</span><span>·</span><span>{doc.dateLabel}</span>
        </div>
      </div>
      <div className="row-tags" style={{ display: "flex", gap: 6, flex: "1 1 30%", flexWrap: "wrap" }}>
        <Chip tag={{ ...doc.status }} onClick={(e) => { e.stopPropagation(); onTag && onTag(doc.status); }} />
        {doc.tags.slice(0, 2).map((tg, i) => <Chip key={i} tag={tg} onClick={(e) => { e.stopPropagation(); onTag && onTag(tg); }} />)}
      </div>
      {showOwner && <div className="row-owner" style={{ flex: "none" }}><Avatar id={doc.owner} size={24} /></div>}
      <Icon name="chevronRight" size={16} style={{ color: "var(--slate-8)", flex: "none" }} />
    </div>
  );
}

// ---- Section header ----
function SectionHeader({ icon, title, sub, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        {icon && <Icon name={icon} size={17} style={{ color: "var(--text-muted)" }} />}
        <h2 className="t-title" style={{ margin: 0, fontSize: "calc(var(--fs-base) + 2px)" }}>{title}</h2>
        {sub && <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>{sub}</span>}
      </div>
      {action && <button className="btn btn-ghost btn-sm" onClick={onAction}>{action}<Icon name="arrowRight" size={14} /></button>}
    </div>
  );
}

// ---- Empty state ----
function EmptyState({ icon = "folderOff", title, body, cta, onCta }) {
  return (
    <div style={{ textAlign: "center", padding: "54px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 13 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--slate-3)", display: "grid", placeItems: "center", color: "var(--slate-9)" }}>
        <Icon name={icon} size={26} stroke={1.5} />
      </div>
      <div>
        <div className="t-title" style={{ fontSize: "calc(var(--fs-base) + 1px)" }}>{title}</div>
        <div className="muted" style={{ fontSize: "var(--fs-sm)", maxWidth: 340, marginTop: 4, textWrap: "pretty" }}>{body}</div>
      </div>
      {cta && <button className="btn btn-secondary" onClick={onCta}>{cta}</button>}
    </div>
  );
}

Object.assign(window, { Chip, Avatar, AvatarStack, DocTile, ConfBadge, DocCard, DocRow, SectionHeader, EmptyState });
