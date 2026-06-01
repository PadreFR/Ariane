/* icons.jsx — fine line icon set (Lucide-style, stroke 1.6) */
const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  sparkles: '<path d="M12 3.5l1.6 4.2 4.2 1.6-4.2 1.6L12 15.1l-1.6-4.2L6.2 9.3l4.2-1.6L12 3.5Z"/><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/><path d="M5 15l.5 1.3L6.8 17l-1.3.5L5 18.8 4.5 17.5 3.2 17l1.3-.7L5 15Z"/>',
  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 16v2.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V16"/>',
  file: '<path d="M14 3v4.5a1 1 0 0 0 1 1H19"/><path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3Z"/>',
  fileText: '<path d="M14 3v4.5a1 1 0 0 0 1 1H19"/><path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3Z"/><path d="M9 12.5h6"/><path d="M9 15.5h6"/><path d="M9 9.5h2"/>',
  contract: '<path d="M14 3v4.5a1 1 0 0 0 1 1H19"/><path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3Z"/><path d="M9 14.5s.8-1 1.6-1 1 1 1.8 1 1.5-1 1.5-1"/><path d="M9 10.5h3"/>',
  receipt: '<path d="M6 3.5h12v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2v-17Z"/><path d="M9 8h6"/><path d="M9 11.5h6"/><path d="M9 15h3"/>',
  presentation: '<path d="M3.5 4h17"/><path d="M4.5 4v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V4"/><path d="m9.5 18-1.5 2.5"/><path d="m14.5 18 1.5 2.5"/><path d="M12 14v4"/>',
  chart: '<path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="M8 16v-4"/><path d="M12.5 16V8"/><path d="M17 16v-6"/>',
  note: '<path d="M5.5 4.5h13a1 1 0 0 1 1 1V14l-5.5 5.5H6.5a1 1 0 0 1-1-1v-13Z"/><path d="M19.5 14H15a1 1 0 0 0-1 1v4.5"/><path d="M9 9h6"/><path d="M9 12h4"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4.2l2.8 1.8"/>',
  users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6a3 3 0 0 1 0 5.5"/><path d="M16.5 13.5A5.5 5.5 0 0 1 20.5 19"/>',
  user: '<circle cx="12" cy="8" r="3.3"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/>',
  share: '<circle cx="17" cy="6" r="2.5"/><circle cx="7" cy="12" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m9.2 10.8 5.6-3.3"/><path d="m9.2 13.2 5.6 3.3"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17.1l-5.25 2.76 1-5.86L3.5 9.66l5.9-.86L12 3.5Z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.4 2.4 4.6-4.8"/>',
  filter: '<path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  x: '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  list: '<path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><circle cx="4.2" cy="6" r="1"/><circle cx="4.2" cy="12" r="1"/><circle cx="4.2" cy="18" r="1"/>',
  layers: '<path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z"/><path d="m4 12 8 4.3 8-4.3"/><path d="m4 15.8 8 4.3 8-4.3"/>',
  home: '<path d="M4 10.5 12 4l8 6.5"/><path d="M5.5 9.5V19a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1V9.5"/><path d="M9.5 20v-5h5v5"/>',
  inbox: '<path d="M4 13h4l1.5 2.5h5L16 13h4"/><path d="M4 13 6 5h12l2 8v5.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V13Z"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  download: '<path d="M12 4v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M5 19h14"/>',
  message: '<path d="M5 5.5h14a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 3.5V6.5a1 1 0 0 1 1-1Z"/>',
  edit: '<path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  link: '<path d="M9.5 14.5 14.5 9.5"/><path d="M11 7l1.2-1.2a3.5 3.5 0 0 1 5 5L16 12"/><path d="M13 17l-1.2 1.2a3.5 3.5 0 0 1-5-5L8 12"/>',
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.3 2.3 3.5 5.3 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.3-3.5-8.5s1.2-6.2 3.5-8.5Z"/>',
  building: '<rect x="5" y="3.5" width="14" height="17" rx="1"/><path d="M9 7.5h2"/><path d="M13 7.5h2"/><path d="M9 11h2"/><path d="M13 11h2"/><path d="M10 20.5v-4h4v4"/>',
  folder: '<path d="M4 7a1.5 1.5 0 0 1 1.5-1.5H9l2 2h7.5A1.5 1.5 0 0 1 20 9v8.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5V7Z"/>',
  folderOff: '<path d="M3 3l18 18"/><path d="M4 7a1.5 1.5 0 0 1 1.5-1.5H9l2 2h7.5A1.5 1.5 0 0 1 20 9v6"/><path d="M4 9v8.5A1.5 1.5 0 0 0 5.5 19h12"/>',
  calendar: '<rect x="4" y="5.5" width="16" height="15" rx="1.5"/><path d="M4 9.5h16"/><path d="M8 3.5v4"/><path d="M16 3.5v4"/>',
  tag: '<path d="M4 4.5h6.5a1 1 0 0 1 .7.3l8 8a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7V4.5Z"/><circle cx="8" cy="8" r="1.4"/>',
  trending: '<path d="M4 16.5 9.5 11l3.5 3.5L20 7.5"/><path d="M15.5 7.5H20v4.5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  history: '<path d="M4 12a8 8 0 1 1 2.4 5.7"/><path d="M4 18v-4h4"/><path d="M12 8v4.2l2.8 1.7"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  command: '<path d="M8 4a2.5 2.5 0 1 0 0 5h8a2.5 2.5 0 1 0 0-5v8a2.5 2.5 0 1 0 0 5H8a2.5 2.5 0 1 0 0-5h8"/>',
  return: '<path d="M9 10 5 14l4 4"/><path d="M5 14h10a4 4 0 0 0 4-4V6"/>',
  thread: '<path d="M5 4v6a4 4 0 0 0 4 4h6a4 4 0 0 1 4 4v2"/>',
  panelRight: '<rect x="4" y="5" width="16" height="14" rx="1.5"/><path d="M15 5v14"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6"/>',
};

function Icon({ name, size = 18, stroke = 1.6, style = {}, className = "" }) {
  const p = ICON_PATHS[name];
  if (!p) return null;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: p }} />
  );
}

window.Icon = Icon;
window.ICON_PATHS = ICON_PATHS;
