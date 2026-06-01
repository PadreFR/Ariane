/* screen-detail.jsx — Vue détail d'un document */
const { useState: useStateDT } = React;

// fake document page preview
function DocPreview({ doc }) {
  const meta = TYPES[doc.type];
  const lines = [12, 10, 11, 7, 0, 12, 9, 11, 10, 6, 0, 11, 8];
  return (
    <div style={{ background: "var(--slate-3)", borderRadius: "var(--r-lg)", padding: "30px 0", display: "flex", justifyContent: "center", minHeight: 520 }}>
      <div className="paper anim-up" style={{ width: "min(560px, 86%)", background: "#fff", borderRadius: 4, boxShadow: "var(--sh-lg)", padding: "44px 48px", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
            <Icon name={meta.icon} size={15} /> {meta.label}
          </span>
          <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>{doc.dateLabel}</span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px", lineHeight: 1.2 }}>{doc.title}</h2>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 26, paddingBottom: 20, borderBottom: "1px solid var(--slate-4)" }}>{doc.excerpt}</div>
        {lines.map((w, i) => w === 0
          ? <div key={i} style={{ height: 14 }} />
          : <div key={i} style={{ height: 9, borderRadius: 3, background: "var(--slate-3)", width: `${w * 8}%`, marginBottom: 9 }} />
        )}
        <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid var(--slate-4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ height: 8, width: 90, background: "var(--slate-3)", borderRadius: 3 }} />
            <div style={{ fontSize: 11, color: "var(--text-subtle)" }}>{PEOPLE[doc.owner].name}</div>
          </div>
          <div style={{ width: 64, height: 64, borderRadius: 6, border: "1.5px dashed var(--slate-6)", display: "grid", placeItems: "center", color: "var(--slate-8)", fontSize: 9, textAlign: "center", lineHeight: 1.2 }}>signature</div>
        </div>
      </div>
    </div>
  );
}

function PanelSection({ icon, title, children, action, onAction }) {
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--border-faint)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 11 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>
          <Icon name={icon} size={14} /> {title}
        </span>
        {action && <button className="btn btn-ghost btn-sm" style={{ height: 22, padding: "0 6px" }} onClick={onAction}>{action}</button>}
      </div>
      {children}
    </div>
  );
}

function ShareModal({ doc, onClose }) {
  const [people, setPeople] = useStateDT(doc.shared.map((id) => ({ id, perm: id === doc.owner ? "Propriétaire" : "Édition" })));
  const [link, setLink] = useStateDT(false);
  const others = Object.keys(PEOPLE).filter((id) => !people.find((p) => p.id === id));
  const [adding, setAdding] = useStateDT(false);
  return (
    <div className="modal-overlay anim-in" onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(17,24,28,.36)", backdropFilter: "blur(2px)", display: "grid", placeItems: "center", zIndex: 200, padding: 20 }}>
      <div className="anim-pop" onClick={(e) => e.stopPropagation()}
        style={{ width: 460, maxWidth: "100%", background: "var(--surface)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-pop)", overflow: "hidden" }}>
        <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)" }}>
          <div>
            <h3 className="t-title" style={{ margin: 0, fontSize: "calc(var(--fs-base) + 2px)" }}>Partager</h3>
            <div className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 360 }}>{doc.title}</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><Icon name="x" size={17} /></button>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <button className="field" onClick={() => setAdding((a) => !a)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "var(--text-subtle)" }}>
              <Icon name="plus" size={15} /> Ajouter une personne…
            </button>
            {adding && (
              <div className="anim-pop" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 10, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-pop)", padding: 5, maxHeight: 200, overflowY: "auto" }}>
                {others.map((id) => (
                  <div key={id} onClick={() => { setPeople((p) => [...p, { id, perm: "Lecture" }]); setAdding(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 8px", borderRadius: "var(--r-sm)", cursor: "pointer" }}>
                    <Avatar id={id} size={24} /> <span style={{ fontSize: "var(--fs-sm)" }}>{PEOPLE[id].name}</span>
                    <span style={{ marginLeft: "auto", fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>{PEOPLE[id].role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {people.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px" }}>
                <Avatar id={p.id} size={30} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "var(--fs-sm)", fontWeight: 500 }}>{PEOPLE[p.id].name}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>{PEOPLE[p.id].role}</div>
                </div>
                {p.perm === "Propriétaire"
                  ? <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>Propriétaire</span>
                  : (
                    <select value={p.perm} onChange={(e) => setPeople((ps) => ps.map((x) => x.id === p.id ? { ...x, perm: e.target.value } : x))}
                      style={{ fontSize: "var(--fs-xs)", border: "1px solid var(--border)", borderRadius: "var(--r-xs)", padding: "4px 6px", background: "var(--surface)", color: "var(--text-muted)", cursor: "pointer" }}>
                      <option>Lecture</option><option>Édition</option>
                    </select>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--slate-2)" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setLink(true)}>
            <Icon name="link" size={14} /> {link ? "Lien copié" : "Copier le lien"}
          </button>
          <button className="btn btn-primary" onClick={onClose}>Terminé</button>
        </div>
      </div>
    </div>
  );
}

function Detail({ docId, onBack, onOpenDoc, onTag, navigate }) {
  const doc = docById(docId);
  const [share, setShare] = useStateDT(false);
  const [valid, setValid] = useStateDT(false);
  const [tab, setTab] = useStateDT("info");
  if (!doc) return null;
  const related = doc.related.map(docById).filter(Boolean);

  return (
    <div className="screen-scroll">
      {share && <ShareModal doc={doc} onClose={() => setShare(false)} />}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px var(--header-pad) 50px" }}>

        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon name="chevronLeft" size={15} /> Retour</button>
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm" onClick={() => setValid(true)}>
            <Icon name="checkCircle" size={15} /> {valid ? "Validation lancée" : "Lancer une validation"}
          </button>
          <button className="btn btn-secondary btn-sm"><Icon name="message" size={15} /> Commenter</button>
          <button className="btn btn-secondary btn-sm"><Icon name="download" size={15} /> Télécharger</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShare(true)}><Icon name="share" size={15} /> Partager</button>
        </div>

        <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 26, alignItems: "start" }}>
          {/* preview */}
          <div>
            <DocPreview doc={doc} />
          </div>

          {/* info panel */}
          <aside className="card" style={{ padding: "4px 18px 18px", position: "sticky", top: 12 }}>
            <div style={{ padding: "16px 0 4px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <DocTile type={doc.type} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h1 className="t-title" style={{ fontSize: "calc(var(--fs-base) + 2px)", margin: 0, lineHeight: 1.25, textWrap: "pretty" }}>{doc.title}</h1>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", marginTop: 3 }}>{TYPES[doc.type].label} · {doc.pages} pages · {doc.size}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                <Chip tag={{ ...doc.status }} onClick={() => onTag(doc.status)} />
                <Chip tag={{ ...doc.conf }} onClick={() => onTag(doc.conf)} />
              </div>
            </div>

            {/* AI summary */}
            <PanelSection icon="sparkles" title="Résumé automatique">
              <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.55, color: "var(--text-muted)", textWrap: "pretty" }}>{doc.summary}</p>
            </PanelSection>

            {/* tags */}
            <PanelSection icon="tag" title="Tags" action={<><Icon name="plus" size={13} /> Ajouter</>}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {doc.tags.map((tg, i) => <Chip key={i} tag={tg} removable onRemove={() => {}} onClick={() => onTag(tg)} />)}
              </div>
            </PanelSection>

            {/* access */}
            <PanelSection icon="users" title="Personnes ayant accès" action="Gérer" onAction={() => setShare(true)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <AvatarStack ids={doc.shared} size={28} max={5} />
                <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>{doc.shared.length} personne{doc.shared.length > 1 ? "s" : ""}</span>
              </div>
            </PanelSection>

            {/* versions */}
            <PanelSection icon="history" title={`Versions (${doc.versions.length})`}>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {doc.versions.map((v, i) => (
                  <div key={i} style={{ display: "flex", gap: 11, padding: "7px 0", position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: i === 0 ? "var(--ink)" : "var(--slate-6)", border: i === 0 ? "none" : "2px solid var(--slate-6)", marginTop: 4 }} />
                      {i < doc.versions.length - 1 && <span style={{ width: 1.5, flex: 1, background: "var(--border)", marginTop: 3 }} />}
                    </div>
                    <div style={{ minWidth: 0, flex: 1, paddingBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span className="mono" style={{ fontSize: "var(--fs-xs)", fontWeight: 600, color: i === 0 ? "var(--text)" : "var(--text-muted)" }}>{v.v}</span>
                        {i === 0 && <span className="chip green" style={{ height: 18, fontSize: 10.5, padding: "0 7px" }}>actuelle</span>}
                        <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", marginLeft: "auto" }}>{v.date}</span>
                      </div>
                      <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 2, textWrap: "pretty" }}>{v.note}</div>
                      <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}><Avatar id={v.who} size={15} /> {PEOPLE[v.who].name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </PanelSection>

            {/* activity */}
            <PanelSection icon="clock" title="Activité récente">
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {doc.activity.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: "var(--fs-xs)" }}>
                    <Avatar id={a.who} size={20} />
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "var(--text)" }}><strong style={{ fontWeight: 600 }}>{PEOPLE[a.who].name.split(" ")[0]}</strong> {a.what}</span>
                      <span style={{ color: "var(--text-subtle)" }}> · {a.when}</span>
                    </div>
                  </div>
                ))}
              </div>
            </PanelSection>

            {/* related */}
            {related.length > 0 && (
              <PanelSection icon="link" title="Documents liés">
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {related.map((r) => (
                    <div key={r.id} onClick={() => onOpenDoc(r.id)} className="related-row"
                      style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 6px", borderRadius: "var(--r-sm)", cursor: "pointer" }}>
                      <Icon name={TYPES[r.type].icon} size={15} style={{ color: "var(--text-muted)", flex: "none" }} />
                      <span style={{ flex: 1, fontSize: "var(--fs-sm)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</span>
                      <Icon name="chevronRight" size={14} style={{ color: "var(--slate-8)", flex: "none" }} />
                    </div>
                  ))}
                </div>
              </PanelSection>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

window.Detail = Detail;
