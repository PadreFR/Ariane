/* data.jsx — Ariane mock dataset (multi-services FR) */

// ---- People ----
const PEOPLE = {
  cp: { id: "cp", name: "Guillaume Tirocco", initials: "GT", color: "#11181c", role: "Moi" },
  lm: { id: "lm", name: "Léa Martin", initials: "LM", color: "#5b7bd6", role: "Juridique" },
  kb: { id: "kb", name: "Karim Benali", initials: "KB", color: "#8a6ddb", role: "Finance" },
  sd: { id: "sd", name: "Sophie Dubois", initials: "SD", color: "#46a35e", role: "RH" },
  tr: { id: "tr", name: "Thomas Roy", initials: "TR", color: "#d99a2b", role: "Projets" },
  jf: { id: "jf", name: "Julie Fontaine", initials: "JF", color: "#3aa89f", role: "Direction" },
  ml: { id: "ml", name: "Marc Lefèvre", initials: "ML", color: "#e0625a", role: "Achats" },
};

// ---- Document type meta (icon + chip color) ----
const TYPES = {
  contrat:      { label: "Contrat", icon: "contract", color: "blue" },
  facture:      { label: "Facture", icon: "receipt", color: "blue" },
  cr:           { label: "CR de réunion", icon: "note", color: "blue" },
  note:         { label: "Note", icon: "fileText", color: "blue" },
  budget:       { label: "Budget", icon: "chart", color: "blue" },
  presentation: { label: "Présentation", icon: "presentation", color: "blue" },
  rapport:      { label: "Rapport", icon: "fileText", color: "blue" },
  nda:          { label: "NDA", icon: "lock", color: "blue" },
  devis:        { label: "Devis", icon: "receipt", color: "blue" },
  fiche:        { label: "Fiche de paie", icon: "fileText", color: "blue" },
  cv:           { label: "CV", icon: "user", color: "blue" },
};

// tag helper
const t = (label, kind, color) => ({ label, kind, color });

// ---- Documents ----
const DOCS = [
  {
    id: "d1",
    title: "Contrat de prestation — Meridian Consulting",
    type: "contrat",
    owner: "lm",
    date: "2026-03-14", dateLabel: "14 mars 2026",
    conf: t("Confidentiel", "confidentialité", "red"),
    status: t("Signé", "statut", "green"),
    tags: [t("Projet Atlas", "projet", "violet"), t("Meridian", "client", "amber"), t("2026", "période", "teal")],
    excerpt: "Le présent contrat de prestation est conclu entre la société et Meridian Consulting pour un accompagnement sur le projet Atlas, signé le 14 mars 2026 par les deux parties.",
    summary: "Contrat de prestation de services avec Meridian Consulting pour le projet Atlas. Durée de 12 mois, montant de 84 000 € HT, signé par les deux parties le 14 mars 2026. Clause de confidentialité et reconduction tacite annuelle.",
    shared: ["lm", "jf", "kb"],
    starred: true,
    pages: 8, size: "1,2 Mo",
    versions: [
      { v: "v3", date: "14 mars 2026", who: "lm", note: "Version signée par les deux parties" },
      { v: "v2", date: "11 mars 2026", who: "jf", note: "Relecture direction, clause 4 modifiée" },
      { v: "v1", date: "6 mars 2026", who: "lm", note: "Première rédaction" },
    ],
    activity: [
      { who: "lm", what: "a signé le document", when: "il y a 11 sem." },
      { who: "jf", what: "a validé la version 2", when: "il y a 12 sem." },
      { who: "lm", what: "a déposé le document", when: "il y a 12 sem." },
    ],
    related: ["d2", "d7", "d11"],
  },
  {
    id: "d2",
    title: "NDA — Meridian Consulting",
    type: "nda",
    owner: "lm",
    date: "2026-02-28", dateLabel: "28 févr. 2026",
    conf: t("Confidentiel", "confidentialité", "red"),
    status: t("Signé", "statut", "green"),
    tags: [t("Projet Atlas", "projet", "violet"), t("Meridian", "client", "amber")],
    excerpt: "Accord de confidentialité préalable à la prestation, couvrant l'ensemble des échanges relatifs au projet Atlas.",
    summary: "Accord de non-divulgation signé en amont du contrat Meridian. Couvre toutes les informations échangées sur le projet Atlas pour une durée de 3 ans après la fin de la collaboration.",
    shared: ["lm", "jf"],
    starred: false,
    pages: 3, size: "420 Ko",
    versions: [{ v: "v1", date: "28 févr. 2026", who: "lm", note: "Version signée" }],
    activity: [{ who: "lm", what: "a déposé le document", when: "il y a 13 sem." }],
    related: ["d1"],
  },
  {
    id: "d3",
    title: "Budget prévisionnel 2026 — consolidé",
    type: "budget",
    owner: "kb",
    date: "2026-05-22", dateLabel: "22 mai 2026",
    conf: t("Restreint", "confidentialité", "red"),
    status: t("Validé", "statut", "green"),
    tags: [t("Budget 2026", "projet", "violet"), t("Finance", "service", "gray"), t("2026", "période", "teal")],
    excerpt: "Budget prévisionnel consolidé pour l'exercice 2026, intégrant les arbitrages de la direction du 20 mai. Dernière version à jour.",
    summary: "Budget consolidé 2026 tous services. Total des charges 4,2 M€, investissements 680 k€. Intègre les arbitrages du comité de direction du 20 mai. Validé par la direction financière.",
    shared: ["kb", "jf", "cp"],
    starred: true,
    pages: 24, size: "3,4 Mo",
    versions: [
      { v: "v5", date: "22 mai 2026", who: "kb", note: "Arbitrages CODIR intégrés — version finale" },
      { v: "v4", date: "18 mai 2026", who: "kb", note: "Révision lignes investissement" },
      { v: "v3", date: "12 mai 2026", who: "cp", note: "Consolidation services" },
    ],
    activity: [
      { who: "jf", what: "a validé le budget", when: "il y a 1 sem." },
      { who: "kb", what: "a mis à jour le document", when: "il y a 1 sem." },
    ],
    related: ["d8", "d13"],
  },
  {
    id: "d4",
    title: "CR réunion de cadrage — Refonte SI",
    type: "cr",
    owner: "tr",
    date: "2026-05-28", dateLabel: "28 mai 2026",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("Validé", "statut", "green"),
    tags: [t("Refonte SI", "projet", "violet"), t("Réunion", "type-sec", "gray"), t("Mai 2026", "période", "teal")],
    excerpt: "Compte rendu de la réunion de cadrage du projet de refonte du système d'information. Périmètre, jalons et répartition des rôles validés.",
    summary: "Cadrage de la refonte SI : périmètre couvrant la GED, la messagerie et l'intranet. Trois jalons définis (T3, T4 2026, T1 2027). Thomas Roy pilote, budget rattaché à l'enveloppe IT.",
    shared: ["tr", "cp", "jf", "kb"],
    starred: false,
    pages: 4, size: "210 Ko",
    versions: [
      { v: "v2", date: "28 mai 2026", who: "tr", note: "Actions ajoutées après relecture" },
      { v: "v1", date: "27 mai 2026", who: "tr", note: "Compte rendu initial" },
    ],
    activity: [
      { who: "tr", what: "a partagé avec l'équipe", when: "il y a 3 j." },
      { who: "tr", what: "a déposé le document", when: "il y a 4 j." },
    ],
    related: ["d9", "d12"],
  },
  {
    id: "d5",
    title: "Avenant n°2 — Contrat Meridian",
    type: "contrat",
    owner: "lm",
    date: "2026-05-30", dateLabel: "30 mai 2026",
    conf: t("Confidentiel", "confidentialité", "red"),
    status: t("En attente", "statut", "amber"),
    tags: [t("Projet Atlas", "projet", "violet"), t("Meridian", "client", "amber"), t("À signer", "action", "amber")],
    excerpt: "Avenant prolongeant la prestation Meridian de 6 mois et ajustant le périmètre d'intervention. En attente de signature.",
    summary: "Avenant n°2 au contrat Meridian : prolongation de 6 mois (jusqu'à mars 2027) et extension du périmètre à la phase de déploiement. Montant additionnel 38 000 € HT. En attente de signature des deux parties.",
    shared: ["lm", "jf"],
    starred: false,
    pages: 2, size: "180 Ko",
    versions: [{ v: "v1", date: "30 mai 2026", who: "lm", note: "Projet d'avenant à valider" }],
    activity: [
      { who: "lm", what: "a demandé une validation à Julie", when: "il y a 2 j." },
      { who: "lm", what: "a déposé le document", when: "il y a 2 j." },
    ],
    related: ["d1", "d2"],
  },
  {
    id: "d6",
    title: "Présentation — Roadmap produit T3 2026",
    type: "presentation",
    owner: "tr",
    date: "2026-05-26", dateLabel: "26 mai 2026",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("À relire", "statut", "amber"),
    tags: [t("Refonte SI", "projet", "violet"), t("Roadmap", "type-sec", "gray"), t("T3 2026", "période", "teal")],
    excerpt: "Support de présentation de la feuille de route produit pour le troisième trimestre, à présenter au comité de pilotage.",
    summary: "Roadmap produit T3 2026 : 4 chantiers prioritaires, dont la refonte de la recherche et la migration GED. Présentation prévue au COPIL du 5 juin. À relire avant diffusion.",
    shared: ["tr", "cp", "jf"],
    starred: false,
    pages: 18, size: "5,1 Mo",
    versions: [
      { v: "v2", date: "26 mai 2026", who: "tr", note: "Slides COPIL ajoutées" },
      { v: "v1", date: "24 mai 2026", who: "cp", note: "Trame initiale" },
    ],
    activity: [
      { who: "tr", what: "vous a demandé une relecture", when: "il y a 5 j." },
    ],
    related: ["d4"],
  },
  {
    id: "d7",
    title: "Facture F-2026-0312 — Meridian Consulting",
    type: "facture",
    owner: "kb",
    date: "2026-04-02", dateLabel: "2 avr. 2026",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("Validé", "statut", "green"),
    tags: [t("Meridian", "client", "amber"), t("Projet Atlas", "projet", "violet"), t("Q2 2026", "période", "teal")],
    excerpt: "Facture du premier acompte de la prestation Meridian, échéance à 30 jours. Rapprochée du bon de commande.",
    summary: "Facture premier acompte Meridian : 28 000 € HT (33 600 € TTC). Échéance 2 mai 2026. Rapprochée du contrat et du bon de commande, validée pour paiement.",
    shared: ["kb", "cp"],
    starred: false,
    pages: 1, size: "96 Ko",
    versions: [{ v: "v1", date: "2 avr. 2026", who: "kb", note: "Facture reçue" }],
    activity: [{ who: "kb", what: "a validé pour paiement", when: "il y a 8 sem." }],
    related: ["d1"],
  },
  {
    id: "d8",
    title: "Note de cadrage — Politique de télétravail",
    type: "note",
    owner: "sd",
    date: "2026-05-19", dateLabel: "19 mai 2026",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("En attente", "statut", "amber"),
    tags: [t("RH", "service", "gray"), t("Télétravail", "thème", "violet"), t("À valider", "action", "amber")],
    excerpt: "Note proposant une révision de l'accord de télétravail : passage à 3 jours par semaine et nouvelles modalités de prise en charge.",
    summary: "Proposition RH de révision de la politique de télétravail : 3 jours/semaine maximum, forfait équipement de 250 €, plages de disponibilité communes. En attente de validation par la direction.",
    shared: ["sd", "jf"],
    starred: false,
    pages: 5, size: "240 Ko",
    versions: [{ v: "v1", date: "19 mai 2026", who: "sd", note: "Projet de note" }],
    activity: [{ who: "sd", what: "a demandé une validation", when: "il y a 1 sem." }],
    related: ["d10"],
  },
  {
    id: "d9",
    title: "CR comité de pilotage — Refonte SI #2",
    type: "cr",
    owner: "tr",
    date: "2026-05-12", dateLabel: "12 mai 2026",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("Validé", "statut", "green"),
    tags: [t("Refonte SI", "projet", "violet"), t("COPIL", "type-sec", "gray"), t("Mai 2026", "période", "teal")],
    excerpt: "Compte rendu du deuxième comité de pilotage de la refonte SI. Avancement des chantiers et arbitrages sur le calendrier.",
    summary: "COPIL #2 refonte SI : chantier GED en avance, migration messagerie décalée à T4. Décision de prioriser la recherche sémantique. Prochain COPIL le 9 juin.",
    shared: ["tr", "cp", "jf", "kb"],
    starred: false,
    pages: 3, size: "190 Ko",
    versions: [{ v: "v1", date: "12 mai 2026", who: "tr", note: "Compte rendu validé" }],
    activity: [{ who: "tr", what: "a déposé le document", when: "il y a 3 sem." }],
    related: ["d4", "d6"],
  },
  {
    id: "d10",
    title: "Accord d'entreprise — Télétravail 2025",
    type: "contrat",
    owner: "sd",
    date: "2025-09-08", dateLabel: "8 sept. 2025",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("Signé", "statut", "green"),
    tags: [t("RH", "service", "gray"), t("Télétravail", "thème", "violet"), t("2025", "période", "teal")],
    excerpt: "Accord d'entreprise en vigueur sur le télétravail, signé en septembre 2025. Référence pour la note de révision en cours.",
    summary: "Accord télétravail actuellement en vigueur : 2 jours/semaine, signé avec les représentants du personnel en septembre 2025. Sert de base à la révision proposée par les RH.",
    shared: ["sd", "jf", "lm"],
    starred: false,
    pages: 11, size: "680 Ko",
    versions: [{ v: "v1", date: "8 sept. 2025", who: "sd", note: "Version signée" }],
    activity: [{ who: "sd", what: "a consulté le document", when: "il y a 1 sem." }],
    related: ["d8"],
  },
  {
    id: "d11",
    title: "Devis — Hébergement & infrastructure 2026",
    type: "devis",
    owner: "ml",
    date: "2026-05-15", dateLabel: "15 mai 2026",
    conf: t("Interne", "confidentialité", "gray"),
    status: t("En attente", "statut", "amber"),
    tags: [t("Refonte SI", "projet", "violet"), t("Achats", "service", "gray"), t("À arbitrer", "action", "amber")],
    excerpt: "Devis pour l'hébergement de l'infrastructure cible de la refonte SI. Trois scénarios chiffrés au choix.",
    summary: "Devis infrastructure refonte SI : 3 scénarios (cloud public 1 850 €/mois, hybride 2 400 €/mois, dédié 3 100 €/mois). Recommandation Achats : scénario hybride. En attente d'arbitrage.",
    shared: ["ml", "tr", "kb"],
    starred: false,
    pages: 6, size: "510 Ko",
    versions: [{ v: "v1", date: "15 mai 2026", who: "ml", note: "Devis fournisseur reçu" }],
    activity: [{ who: "ml", what: "a partagé avec Projets", when: "il y a 2 sem." }],
    related: ["d4", "d3"],
  },
  {
    id: "d12",
    title: "Rapport d'audit — Sécurité documentaire",
    type: "rapport",
    owner: "jf",
    date: "2026-04-20", dateLabel: "20 avr. 2026",
    conf: t("Restreint", "confidentialité", "red"),
    status: t("Validé", "statut", "green"),
    tags: [t("Refonte SI", "projet", "violet"), t("Sécurité", "thème", "violet"), t("Audit", "type-sec", "gray")],
    excerpt: "Rapport d'audit de la sécurité documentaire actuelle. Constats, risques et recommandations pour la nouvelle GED.",
    summary: "Audit sécurité documentaire : 4 risques majeurs identifiés sur la GED actuelle (droits trop larges, absence de traçabilité, doublons). 9 recommandations dont le chiffrement et la gestion fine des accès.",
    shared: ["jf", "tr", "lm"],
    starred: true,
    pages: 22, size: "2,8 Mo",
    versions: [{ v: "v1", date: "20 avr. 2026", who: "jf", note: "Rapport final" }],
    activity: [{ who: "jf", what: "a restreint l'accès", when: "il y a 6 sem." }],
    related: ["d4", "d9"],
  },
  {
    id: "d13",
    title: "Tableau de suivi — Trésorerie mai 2026",
    type: "budget",
    owner: "kb",
    date: "2026-05-31", dateLabel: "31 mai 2026",
    conf: t("Restreint", "confidentialité", "red"),
    status: t("Brouillon", "statut", "gray"),
    tags: [t("Finance", "service", "gray"), t("Trésorerie", "thème", "violet"), t("Mai 2026", "période", "teal")],
    excerpt: "Suivi de trésorerie du mois de mai. Encaissements, décaissements et position de fin de mois.",
    summary: "Suivi trésorerie mai 2026 : position de fin de mois +312 k€. Principaux décaissements : masse salariale et acompte Meridian. Brouillon en cours de finalisation.",
    shared: ["kb"],
    starred: false,
    pages: 2, size: "140 Ko",
    versions: [{ v: "v1", date: "31 mai 2026", who: "kb", note: "Brouillon" }],
    activity: [{ who: "kb", what: "a créé le document", when: "hier" }],
    related: ["d3", "d7"],
  },
  {
    id: "d14",
    title: "CV — Candidature Data Analyst (A. Moreau)",
    type: "cv",
    owner: "sd",
    date: "2026-05-29", dateLabel: "29 mai 2026",
    conf: t("Confidentiel", "confidentialité", "red"),
    status: t("Brouillon", "statut", "gray"),
    tags: [t("RH", "service", "gray"), t("Recrutement Q2", "projet", "violet"), t("Candidature", "type-sec", "gray")],
    excerpt: "CV reçu pour le poste de Data Analyst. Profil 5 ans d'expérience, à transmettre au manager pour entretien.",
    summary: "Candidature Data Analyst d'Alex Moreau : 5 ans d'expérience, compétences Python/SQL/dataviz. Recommandé pour un premier entretien par les RH.",
    shared: ["sd"],
    starred: false,
    pages: 2, size: "320 Ko",
    versions: [{ v: "v1", date: "29 mai 2026", who: "sd", note: "CV reçu" }],
    activity: [{ who: "sd", what: "a déposé le document", when: "il y a 2 j." }],
    related: [],
  },
];

const docById = (id) => DOCS.find((d) => d.id === id);

// ---- Dynamic views (a "view" = a saved filter, never a folder) ----
const VIEWS = [
  {
    id: "recents", label: "Récents", icon: "clock",
    desc: "Vos derniers documents consultés ou modifiés",
    filter: (d) => true,
    sort: (a, b) => b.date.localeCompare(a.date),
  },
  {
    id: "shared", label: "Partagés avec moi", icon: "share",
    desc: "Documents que vos collègues ont partagés",
    filter: (d) => d.shared.includes("cp") && d.owner !== "cp",
  },
  {
    id: "pending", label: "En attente de validation", icon: "clock",
    desc: "Documents qui attendent une signature ou une validation",
    filter: (d) => d.status.label === "En attente" || d.status.label === "À relire",
  },
  {
    id: "projects", label: "Mes projets", icon: "layers",
    desc: "Regroupés par projet en cours",
    filter: (d) => d.tags.some((x) => x.kind === "projet"),
  },
  {
    id: "important", label: "Documents importants", icon: "star",
    desc: "Vos documents épinglés",
    filter: (d) => d.starred,
  },
];

const viewDocs = (view) => {
  let r = DOCS.filter(view.filter);
  if (view.sort) r = [...r].sort(view.sort);
  return r;
};

// ---- Suggestions for dashboard ----
const SUGGESTIONS = [
  { id: "d6", kind: "relire", icon: "edit", label: "À relire pour vous", reason: "Thomas vous a demandé une relecture il y a 5 jours" },
  { id: "d5", kind: "valider", icon: "checkCircle", label: "En attente de validation", reason: "Avenant Meridian — à valider avant signature" },
  { id: "d3", kind: "repris", icon: "history", label: "Repris récemment", reason: "Vous avez consulté le budget 2026 cette semaine" },
];

// detected duplicates pair
const DUPLICATE = { a: "d10", b: "d8", note: "Deux documents très proches sur le télétravail — l'un révise l'autre" };

// ---- Search ----
const EXAMPLE_QUERIES = [
  "le contrat signé en mars avec Meridian",
  "la dernière version du budget 2026",
  "les comptes rendus de la refonte SI",
  "documents confidentiels en attente de signature",
  "ce que Sophie a partagé sur le télétravail",
];

// live autocomplete suggestions while typing
function searchSuggestions(q) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const out = [];
  EXAMPLE_QUERIES.forEach((ex) => {
    if (ex.toLowerCase().includes(s) || s.split(" ").some((w) => w.length > 2 && ex.toLowerCase().includes(w)))
      out.push({ kind: "query", text: ex });
  });
  // tag / entity suggestions
  const ents = [
    { text: "Meridian", kind: "entity", sub: "Client · 4 documents" },
    { text: "Refonte SI", kind: "entity", sub: "Projet · 5 documents" },
    { text: "Budget 2026", kind: "entity", sub: "Projet · 2 documents" },
    { text: "Télétravail", kind: "entity", sub: "Thème · 3 documents" },
    { text: "Confidentiel", kind: "entity", sub: "Confidentialité · 5 documents" },
  ];
  ents.forEach((e) => { if (e.text.toLowerCase().includes(s) || s.includes(e.text.toLowerCase().slice(0, 4))) out.push(e); });
  return out.slice(0, 6);
}

// run a semantic-ish search → ranked results with match reasons
function runSearch(q) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const tokens = s.split(/\s+/).filter((w) => w.length > 2);
  const stop = ["les", "des", "une", "que", "qui", "avec", "pour", "dans", "sur", "ont", "est", "son", "ses", "the", "and", "version", "dernière", "dernier", "documents", "document"];
  const kw = tokens.filter((w) => !stop.includes(w));
  const scored = DOCS.map((d) => {
    const hay = (d.title + " " + d.excerpt + " " + d.summary + " " + d.type + " " + d.tags.map((x) => x.label).join(" ") + " " + d.status.label + " " + d.conf.label).toLowerCase();
    let score = 0; const hits = [];
    kw.forEach((w) => { if (hay.includes(w)) { score += 1; hits.push(w); } });
    // intent boosts
    if (s.includes("signé") && d.status.label === "Signé") score += 1.5;
    if (s.includes("signer") && d.tags.some((x) => x.label.includes("signer"))) score += 1.5;
    if (s.includes("attente") && d.status.label === "En attente") score += 1.5;
    if (s.includes("confidentiel") && (d.conf.label === "Confidentiel" || d.conf.label === "Restreint")) score += 1.5;
    if (s.includes("mars") && d.dateLabel.includes("mars")) score += 1.2;
    if (s.includes("budget") && d.type === "budget") score += 1.5;
    if (s.includes("contrat") && d.type === "contrat") score += 1;
    if ((s.includes("compte") || s.includes("cr") || s.includes("réunion")) && d.type === "cr") score += 1.2;
    return { doc: d, score, hits };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score);
  return scored;
}

// build a highlighted excerpt for a result
function highlightExcerpt(text, hits) {
  if (!hits || !hits.length) return [{ text, hl: false }];
  const re = new RegExp("(" + hits.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
  const parts = text.split(re);
  return parts.filter((p) => p !== "").map((p) => ({ text: p, hl: re.test(p) && hits.some((h) => p.toLowerCase().includes(h)) }));
}

Object.assign(window, {
  PEOPLE, TYPES, DOCS, VIEWS, SUGGESTIONS, DUPLICATE, EXAMPLE_QUERIES,
  docById, viewDocs, searchSuggestions, runSearch, highlightExcerpt,
});
