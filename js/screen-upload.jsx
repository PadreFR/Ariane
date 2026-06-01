/* screen-upload.jsx — Dépôt d'un document avec analyse IA en direct */
const { useState: useStateUP, useEffect: useEffectUP, useRef: useRefUP } = React;

// canned analysis result
const ANALYSIS = {
  title: "Contrat de prestation — Meridian Consulting",
  type: "contrat",
  tags: [
    { label: "Projet Atlas", kind: "projet", color: "violet" },
    { label: "Meridian", kind: "client", color: "amber" },
    { label: "Léa Martin", kind: "personne", color: "amber" },
    { label: "Mars 2026", kind: "période", color: "teal" },
  ],
  conf: "Confidentiel",
  status: { label: "Signé", color: "green" },
};

const CONF_OPTIONS = [
  { label: "Public", icon: "globe" },
  { label: "Interne", icon: "building" },
  { label: "Confidentiel", icon: "lock" },
  { label: "Restreint", icon: "lock" },
];

const STATUS_STEPS = [
  "Lecture du document…",
  "Compréhension du contenu…",
  "Identification du type et des personnes…",
  "Proposition d'un classement…",
];

function Thinking({ label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {label}
      <span style={{ display: "inline-flex", gap: 3, marginLeft: 2 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", animation: `pulse-dot 1.1s ${i * 0.15}s infinite` }} />
        ))}
      </span>
    </span>
  );
}

// a field that reveals its value with a shimmer → pop
function AnalysedField({ revealed, label, children, placeholder }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <span style={{ fontSize: "var(--fs-xs)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</span>
        {revealed && (
          <span className="anim-in" style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: "var(--fs-xs)", color: "var(--tag-green-fg)", background: "var(--tag-green-bg)", padding: "1px 7px", borderRadius: "var(--r-full)" }}>
            <Icon name="sparkles" size={11} /> proposé
          </span>
        )}
      </div>
      {revealed ? (
        <div className="anim-up">{children}</div>
      ) : (
        <div style={{ height: 38, borderRadius: "var(--r-sm)", background: "linear-gradient(90deg, var(--slate-3) 25%, var(--slate-4) 37%, var(--slate-3) 63%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
      )}
    </div>
  );
}

function Upload({ filename, onSave, onCancel }) {
  const [step, setStep] = useStateUP(0);          // analysis progress 0..N
  const [statusIdx, setStatusIdx] = useStateUP(0);
  const [done, setDone] = useStateUP(false);
  const [saved, setSaved] = useStateUP(false);

  // editable fields
  const [title, setTitle] = useStateUP(ANALYSIS.title);
  const [type, setType] = useStateUP(ANALYSIS.type);
  const [tags, setTags] = useStateUP([]);
  const [conf, setConf] = useStateUP(ANALYSIS.conf);
  const [typeOpen, setTypeOpen] = useStateUP(false);

  const orig = filename || "CONTRAT_meridian_signe_VF_v2.pdf";

  useEffectUP(() => {
    const timers = [];
    // status messages cycle
    STATUS_STEPS.forEach((_, i) => timers.push(setTimeout(() => setStatusIdx(i), 500 + i * 650)));
    // reveal: 1=title, 2=type, 3..=tags one by one, last=conf
    timers.push(setTimeout(() => setStep(1), 1500));
    timers.push(setTimeout(() => setStep(2), 2150));
    ANALYSIS.tags.forEach((tg, i) => {
      timers.push(setTimeout(() => { setStep(3 + i); setTags((t) => [...t, tg]); }, 2700 + i * 420));
    });
    const tagsEnd = 2700 + ANALYSIS.tags.length * 420;
    timers.push(setTimeout(() => setStep(3 + ANALYSIS.tags.length), tagsEnd + 200));
    timers.push(setTimeout(() => setDone(true), tagsEnd + 700));
    return () => timers.forEach(clearTimeout);
  }, []);

  const tagsRevealStart = 3;
  const confStep = 3 + ANALYSIS.tags.length;
  const typeMeta = TYPES[type];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onSave && onSave({ title, type, tags, conf }), 1500);
  };

  if (saved) {
    return (
      <div className="screen-scroll" style={{ display: "grid", placeItems: "center" }}>
        <div className="anim-pop" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: "var(--tag-green-bg)", display: "grid", placeItems: "center", margin: "0 auto 20px", color: "var(--tag-green-fg)" }}>
            <Icon name="check" size={38} stroke={2} />
          </div>
          <h2 className="t-title" style={{ fontSize: 22, margin: "0 0 6px" }}>Enregistré.</h2>
          <p className="muted" style={{ maxWidth: 360, margin: "0 auto", textWrap: "balance" }}>
            « {title} » est rangé tout seul. Tu le retrouveras dans <strong style={{ color: "var(--text)" }}>Récents</strong>, via tes tags ou en le décrivant.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-scroll">
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "26px var(--header-pad) 60px" }}>
        <button className="btn btn-ghost btn-sm" onClick={onCancel} style={{ marginBottom: 16 }}><Icon name="chevronLeft" size={15} /> Annuler le dépôt</button>

        {/* status header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <span style={{ width: 46, height: 46, borderRadius: "var(--r-md)", background: done ? "var(--tag-green-bg)" : "var(--ink)", color: done ? "var(--tag-green-fg)" : "#fff", display: "grid", placeItems: "center", flex: "none", transition: "background .3s" }}>
            <Icon name={done ? "checkCircle" : "sparkles"} size={24} style={done ? {} : { animation: "pulse-dot 1.4s infinite" }} />
          </span>
          <div>
            <h1 className="t-title" style={{ fontSize: 21, margin: 0 }}>
              {done ? "Voilà ce qu'Ariane propose" : <Thinking label="Ariane analyse ton document" />}
            </h1>
            <p className="muted" style={{ margin: "3px 0 0", fontSize: "var(--fs-sm)" }}>
              {done ? "Tout est pré-rempli et modifiable — tu gardes le dernier mot." : STATUS_STEPS[statusIdx]}
            </p>
          </div>
        </div>

        {/* the file */}
        <div className="card" style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
          {!done && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(17,24,28,.06), transparent)", backgroundSize: "60% 100%", animation: "shimmer 1.6s infinite" }} />}
          <DocTile type={type} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="mono" style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{orig}</div>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)" }}>PDF · 1,2 Mo · 8 pages</div>
          </div>
          <span className="chip" style={{ background: "var(--slate-3)", color: "var(--text-muted)" }}>
            {done ? "Analysé" : "Lecture…"}
          </span>
        </div>

        {/* the "no folder" reassurance */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "var(--fs-sm)", color: "var(--text-muted)", background: "var(--slate-2)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "11px 14px", marginBottom: 26 }}>
          <Icon name="folderOff" size={16} style={{ color: "var(--ink)", flex: "none" }} />
          <span>On ne te demande <strong style={{ color: "var(--text)" }}>jamais</strong> dans quel dossier ranger. Ariane tague, tu valides.</span>
        </div>

        {/* fields */}
        <AnalysedField revealed={step >= 1} label="Titre proposé">
          <input className="field" style={{ height: 42, fontSize: "calc(var(--fs-base) + 1px)", fontWeight: 500 }} value={title} onChange={(e) => setTitle(e.target.value)} />
        </AnalysedField>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <AnalysedField revealed={step >= 2} label="Type de document">
            <div style={{ position: "relative" }}>
              <button className="field" onClick={() => setTypeOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 8, height: 42, cursor: "pointer", textAlign: "left" }}>
                <Icon name={typeMeta.icon} size={16} style={{ color: "var(--text-muted)" }} />
                <span style={{ flex: 1 }}>{typeMeta.label}</span>
                <Icon name="chevronDown" size={15} style={{ color: "var(--text-subtle)" }} />
              </button>
              {typeOpen && (
                <div className="anim-pop" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 30, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-pop)", padding: 5, maxHeight: 230, overflowY: "auto" }}>
                  {Object.entries(TYPES).map(([k, m]) => (
                    <div key={k} onClick={() => { setType(k); setTypeOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 9px", borderRadius: "var(--r-sm)", cursor: "pointer", fontSize: "var(--fs-sm)", background: k === type ? "var(--slate-3)" : "transparent" }}>
                      <Icon name={m.icon} size={15} style={{ color: "var(--text-muted)" }} /> {m.label}
                      {k === type && <Icon name="check" size={14} style={{ marginLeft: "auto", color: "var(--ink)" }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnalysedField>

          <AnalysedField revealed={step >= confStep} label="Confidentialité suggérée">
            <div style={{ display: "flex", gap: 4, background: "var(--slate-2)", padding: 4, borderRadius: "var(--r-sm)", border: "1px solid var(--border)" }}>
              {CONF_OPTIONS.map((c) => {
                const on = c.label === conf;
                return (
                  <button key={c.label} onClick={() => setConf(c.label)} title={c.label}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, height: 32, border: "none", borderRadius: "var(--r-xs)", cursor: "pointer", fontSize: "var(--fs-xs)", fontWeight: 500,
                      background: on ? "var(--surface)" : "transparent", color: on ? "var(--text)" : "var(--text-subtle)", boxShadow: on ? "var(--sh-xs)" : "none" }}>
                    <Icon name={c.icon} size={13} /> <span className="conf-lbl">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </AnalysedField>
        </div>

        <AnalysedField revealed={step >= tagsRevealStart} label="Tags détectés">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center", minHeight: 24 }}>
            {tags.map((tg, i) => (
              <span key={i} className="anim-pop">
                <Chip tag={tg} removable onRemove={() => setTags((t) => t.filter((_, j) => j !== i))} />
              </span>
            ))}
            {done && (
              <button className="btn btn-ghost btn-sm" style={{ height: 24, border: "1px dashed var(--border-strong)", borderRadius: "var(--r-full)", color: "var(--text-muted)" }}>
                <Icon name="plus" size={13} /> Ajouter
              </button>
            )}
          </div>
        </AnalysedField>

        {/* actions */}
        <div className="hr" style={{ margin: "26px 0 20px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: 7, maxWidth: 320 }}>
            <Icon name="lock" size={14} /> Aucun emplacement à choisir. Le document sera retrouvable par ses tags et par la recherche.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary" onClick={onCancel}>Annuler</button>
            <button className="btn btn-primary btn-lg" disabled={!done} onClick={handleSave} style={{ opacity: done ? 1 : .5, cursor: done ? "pointer" : "default" }}>
              <Icon name="check" size={16} /> Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Upload = Upload;
