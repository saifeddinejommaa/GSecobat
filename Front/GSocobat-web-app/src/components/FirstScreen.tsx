import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg1: #060818; --bg2: #0c1030;
    --glass: rgba(255,255,255,0.04); --glass-border: rgba(255,255,255,0.09); --glass-hover: rgba(255,255,255,0.07);
    --accent: #6c8cff; --accent2: #a78bfa; --accent3: #34d399; --accent4: #f472b6;
    --text: #e2e8f0; --muted: #475569; --muted2: #64748b;
  }
  body { font-family: 'Outfit', sans-serif; background: var(--bg1); color: var(--text); }
  .shell { display: flex; min-height: 100vh; background: var(--bg1); position: relative; overflow: hidden; }
  .orb { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; opacity: 0.22; }
  .orb-1 { width: 500px; height: 500px; background: #3b3fd8; top: -150px; left: -100px; }
  .orb-2 { width: 400px; height: 400px; background: #7c3aed; bottom: -100px; right: 10%; }
  .orb-3 { width: 300px; height: 300px; background: #0f766e; top: 40%; left: 35%; }

  /* SIDEBAR */
  .sidebar { width: 260px; min-height: 100vh; background: rgba(255,255,255,0.03); border-right: 1px solid var(--glass-border); backdrop-filter: blur(20px); display: flex; flex-direction: column; position: sticky; top: 0; z-index: 10; flex-shrink: 0; }
  .logo-area { padding: 26px 22px 18px; border-bottom: 1px solid var(--glass-border); display: flex; align-items: center; gap: 12px; }
  .logo-icon { width: 36px; height: 36px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; box-shadow: 0 0 20px rgba(108,140,255,0.4); }
  .logo-text { font-size: 17px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; }
  .logo-sub { font-size: 11px; color: var(--muted2); }
  .nav-section { padding: 16px 14px 8px; flex: 1; overflow-y: auto; }
  .nav-label { font-size: 10px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; padding: 0 8px; margin-bottom: 4px; margin-top: 14px; }
  .nav-item { display: flex; align-items: center; gap: 11px; padding: 9px 11px; border-radius: 10px; cursor: pointer; transition: all 0.18s; color: var(--muted2); font-size: 13.5px; font-weight: 500; border: 1px solid transparent; }
  .nav-item:hover { background: var(--glass-hover); color: var(--text); border-color: var(--glass-border); }
  .nav-item.active { background: rgba(108,140,255,0.12); color: #a5b4fc; border-color: rgba(108,140,255,0.25); }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
  .nav-badge { margin-left: auto; background: var(--accent); color: #fff; font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 99px; font-family: 'JetBrains Mono', monospace; }
  .sidebar-footer { padding: 14px; border-top: 1px solid var(--glass-border); }
  .user-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--glass); border: 1px solid var(--glass-border); cursor: pointer; transition: background 0.2s; }
  .user-card:hover { background: var(--glass-hover); }
  .avatar { width: 34px; height: 34px; background: linear-gradient(135deg, var(--accent2), var(--accent4)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; color: #fff; }
  .user-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .user-role { font-size: 11px; color: var(--muted2); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; z-index: 1; }
  .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 28px; border-bottom: 1px solid var(--glass-border); background: rgba(255,255,255,0.02); backdrop-filter: blur(12px); }
  .page-title { font-size: 19px; font-weight: 700; color: #f1f5f9; }
  .page-sub { font-size: 12px; color: var(--muted2); margin-top: 2px; }
  .topbar-actions { display: flex; align-items: center; gap: 8px; }
  .btn-icon { width: 36px; height: 36px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; transition: all 0.2s; color: var(--muted2); }
  .btn-icon:hover { background: var(--glass-hover); color: var(--text); }
  .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 10px; color: #fff; font-size: 13px; font-weight: 600; padding: 0 16px; height: 36px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-family: 'Outfit', sans-serif; box-shadow: 0 4px 15px rgba(108,140,255,0.3); }
  .btn-primary:hover { opacity: 0.88; }

  /* CONTENT */
  .content { flex: 1; padding: 24px 28px; overflow-y: auto; }
  .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
  .kpi-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 18px; backdrop-filter: blur(16px); transition: all 0.25s; position: relative; overflow: hidden; }
  .kpi-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--kpi-color, var(--accent)); opacity: 0.8; }
  .kpi-card:hover { background: var(--glass-hover); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
  .kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .kpi-label { font-size: 11px; font-weight: 500; color: var(--muted2); text-transform: uppercase; letter-spacing: 0.8px; }
  .kpi-icon-wrap { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
  .kpi-value { font-size: 26px; font-weight: 800; color: #f1f5f9; letter-spacing: -1px; line-height: 1; }
  .kpi-sub { font-size: 11px; color: var(--muted2); margin-top: 6px; display: flex; align-items: center; gap: 4px; }
  .kpi-up { color: var(--accent3); } .kpi-down { color: var(--accent4); }

  .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; margin-bottom: 20px; }
  .glass-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 20px; backdrop-filter: blur(16px); }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .card-title { font-size: 14px; font-weight: 700; color: #f1f5f9; }
  .card-sub { font-size: 11px; color: var(--muted2); margin-top: 2px; }
  .chip { font-size: 11px; padding: 3px 10px; border-radius: 99px; font-weight: 500; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: var(--muted2); cursor: pointer; }
  .chip.active { background: rgba(108,140,255,0.15); border-color: rgba(108,140,255,0.3); color: #a5b4fc; }

  .bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 110px; }
  .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .bar { width: 100%; border-radius: 4px 4px 0 0; transition: opacity 0.2s; min-height: 4px; }
  .bar:hover { opacity: 0.72; }
  .bar-label { font-size: 10px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }

  .donut-wrap { display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .donut-legend { width: 100%; display: flex; flex-direction: column; gap: 7px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; }
  .legend-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .legend-name { color: var(--muted2); flex: 1; }
  .legend-pct { color: var(--text); font-weight: 600; font-family: 'JetBrains Mono', monospace; font-size: 11px; }

  .bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 10px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; padding: 0 0 10px; text-align: left; border-bottom: 1px solid var(--glass-border); }
  td { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 12.5px; vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  .status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 5px; }

  .activity-list { display: flex; flex-direction: column; }
  .activity-item { display: flex; gap: 11px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); align-items: flex-start; }
  .activity-item:last-child { border-bottom: none; }
  .activity-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
  .activity-text { font-size: 12px; color: var(--text); line-height: 1.4; }
  .activity-time { font-size: 10px; color: var(--muted); margin-top: 2px; font-family: 'JetBrains Mono', monospace; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 99px; }
`;

const navItems = [
  { icon: "⬡", label: "Dashboard", section: "main" },
  { icon: "📊", label: "Analytics", section: "main" },
  { icon: "👥", label: "Utilisateurs", section: "main", badge: "12" },
  { icon: "💼", label: "Projets", section: "main" },
  { icon: "🛍", label: "Commandes", section: "commerce", badge: "4" },
  { icon: "📦", label: "Produits", section: "commerce" },
  { icon: "💳", label: "Paiements", section: "commerce" },
  { icon: "📣", label: "Campagnes", section: "marketing" },
  { icon: "📩", label: "Emails", section: "marketing" },
  { icon: "⚙️", label: "Paramètres", section: "system" },
  { icon: "🔔", label: "Notifications", section: "system" },
];

const kpis = [
  { label: "Revenus totaux", value: "84 230 €", sub: "+12.4% ce mois", up: true, icon: "💰", color: "#6c8cff" },
  { label: "Nouveaux users", value: "3 482", sub: "+8.1% cette semaine", up: true, icon: "👤", color: "#a78bfa" },
  { label: "Commandes actives", value: "1 094", sub: "-2.3% vs hier", up: false, icon: "📦", color: "#34d399" },
  { label: "Taux conversion", value: "4.72%", sub: "+0.5pt ce mois", up: true, icon: "🎯", color: "#f472b6" },
];

const barData = [
  { label: "Lun", a: 65, b: 40 }, { label: "Mar", a: 80, b: 55 },
  { label: "Mer", a: 55, b: 70 }, { label: "Jeu", a: 90, b: 60 },
  { label: "Ven", a: 75, b: 45 }, { label: "Sam", a: 50, b: 35 }, { label: "Dim", a: 40, b: 25 },
];

const donutData = [
  { label: "Direct", pct: 38, color: "#6c8cff" }, { label: "Organique", pct: 27, color: "#a78bfa" },
  { label: "Social", pct: 21, color: "#34d399" }, { label: "Référent", pct: 14, color: "#f472b6" },
];

const orders = [
  { id: "#8821", client: "Marie Dupont", amount: "340 €", status: "Livré", color: "#34d399" },
  { id: "#8820", client: "Julien Martin", amount: "128 €", status: "En cours", color: "#6c8cff" },
  { id: "#8819", client: "Sarah Cohen", amount: "892 €", status: "En attente", color: "#fbbf24" },
  { id: "#8818", client: "Tom Bernard", amount: "55 €", status: "Annulé", color: "#f472b6" },
];

const activities = [
  { icon: "👤", text: "Nouvel utilisateur — alice@mail.com", time: "il y a 2 min" },
  { icon: "💳", text: "Paiement reçu — 892 € commande #8819", time: "il y a 11 min" },
  { icon: "📦", text: "Commande #8821 expédiée via Colissimo", time: "il y a 34 min" },
  { icon: "⚠️", text: "Stock faible — SKU-4421 (5 restants)", time: "il y a 1h" },
  { icon: "📣", text: "Campagne «Soldes» lancée — 12k envois", time: "il y a 2h" },
];

 type DonutItem = {
  label: string;
  pct: number;
  color: string;
};

function DonutChart({ data }: { data: DonutItem[] }) {
  const r = 44, cx = 56, cy = 56, stroke = 13, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 112 112" width={100} height={100}>
      {data.map((d, i) => {
        const dash = (d.pct / 100) * circ, gap = circ - dash;
        const seg = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={stroke} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", opacity: 0.85 }} />;
        offset += dash; return seg;
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fill="#f1f5f9" fontSize="12" fontWeight="700" fontFamily="Outfit">84k</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Outfit">revenus</text>
    </svg>
  );
}

export default function GlassDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [activeChip, setActiveChip] = useState("7j");
  const sections = [
    { key: "main", label: "Principal" }, { key: "commerce", label: "Commerce" },
    { key: "marketing", label: "Marketing" }, { key: "system", label: "Système" },
  ];

  return (
    <>
      <style>{style}</style>
      <div className="shell">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="logo-area">
            <div className="logo-icon">✦</div>
            <div><div className="logo-text">GSecobat</div><div className="logo-sub">Admin Console</div></div>
          </div>
          <nav className="nav-section">
            {sections.map(sec => (
              <div key={sec.key}>
                <div className="nav-label">{sec.label}</div>
                {navItems.filter(n => n.section === sec.key).map(n => (
                  <div key={n.label} className={`nav-item ${activeNav === n.label ? "active" : ""}`} onClick={() => setActiveNav(n.label)}>
                    <span className="nav-icon">{n.icon}</span>
                    <span>{n.label}</span>
                    {n.badge && <span className="nav-badge">{n.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="user-card">
              <div className="avatar">ML</div>
              <div><div className="user-name">Marc Lefèvre</div><div className="user-role">Super Admin</div></div>
              <span style={{ marginLeft: "auto", color: "var(--muted2)", fontSize: 14 }}>⋯</span>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">
          <div className="topbar">
            <div>
              <div className="page-title">Tableau de bord</div>
              <div className="page-sub">Samedi 18 avril 2025 — Vue d'ensemble</div>
            </div>
            <div className="topbar-actions">
              <div className="btn-icon">🔍</div>
              <div className="btn-icon" style={{ position: "relative" }}>
                🔔
                <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "var(--accent4)", borderRadius: "50%", border: "2px solid var(--bg1)" }} />
              </div>
              <button className="btn-primary">＋ Nouveau rapport</button>
            </div>
          </div>

          <div className="content">
            {/* KPI row */}
            <div className="kpi-grid">
              {kpis.map((k, i) => (
                <div className="kpi-card" key={i} style={{ "--kpi-color": k.color } as React.CSSProperties}>
                  <div className="kpi-top">
                    <span className="kpi-label">{k.label}</span>
                    <div className="kpi-icon-wrap">{k.icon}</div>
                  </div>
                  <div className="kpi-value">{k.value}</div>
                  <div className="kpi-sub">
                    <span className={k.up ? "kpi-up" : "kpi-down"}>{k.up ? "▲" : "▼"}</span>{k.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="charts-row">
              <div className="glass-card">
                <div className="card-header">
                  <div><div className="card-title">Revenus & Commandes</div><div className="card-sub">Performance hebdomadaire</div></div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["7j", "30j", "90j"].map(c => <span key={c} className={`chip ${activeChip === c ? "active" : ""}`} onClick={() => setActiveChip(c)}>{c}</span>)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  {[["#6c8cff", "Revenus"], ["#34d399", "Commandes"]].map(([c, l]) => (
                    <span key={l} style={{ fontSize: 11, color: "var(--muted2)", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ display: "inline-block", width: 9, height: 9, background: c, borderRadius: 2 }} />{l}
                    </span>
                  ))}
                </div>
                <div className="bar-chart">
                  {barData.map((d, i) => (
                    <div className="bar-group" key={i}>
                      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", flex: 1, width: "100%" }}>
                        <div className="bar" style={{ height: `${d.a}%`, background: "linear-gradient(to top,#6c8cff,#a78bfa)", flex: 1 }} />
                        <div className="bar" style={{ height: `${d.b}%`, background: "linear-gradient(to top,#34d399,#0d9488)", flex: 1 }} />
                      </div>
                      <span className="bar-label">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card">
                <div className="card-header">
                  <div><div className="card-title">Sources trafic</div><div className="card-sub">Ce mois-ci</div></div>
                </div>
                <div className="donut-wrap">
                  <DonutChart data={donutData} />
                  <div className="donut-legend">
                    {donutData.map((d, i) => (
                      <div className="legend-item" key={i}>
                        <span className="legend-dot" style={{ background: d.color }} />
                        <span className="legend-name">{d.label}</span>
                        <span className="legend-pct">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="bottom-row">
              <div className="glass-card">
                <div className="card-header">
                  <div><div className="card-title">Dernières commandes</div><div className="card-sub">4 commandes récentes</div></div>
                  <span className="chip">Voir tout →</span>
                </div>
                <table>
                  <thead><tr><th>ID</th><th>Client</th><th>Montant</th><th>Statut</th></tr></thead>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "var(--muted2)" }}>{o.id}</td>
                        <td style={{ fontWeight: 500 }}>{o.client}</td>
                        <td style={{ fontFamily: "'JetBrains Mono'", fontSize: 11 }}>{o.amount}</td>
                        <td><span className="status-dot" style={{ background: o.color }} /><span style={{ color: o.color, fontSize: 11, fontWeight: 500 }}>{o.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="glass-card">
                <div className="card-header">
                  <div><div className="card-title">Activité récente</div><div className="card-sub">Événements en temps réel</div></div>
                  <span style={{ width: 8, height: 8, background: "#34d399", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #34d399" }} />
                </div>
                <div className="activity-list">
                  {activities.map((a, i) => (
                    <div className="activity-item" key={i}>
                      <div className="activity-icon">{a.icon}</div>
                      <div><div className="activity-text">{a.text}</div><div className="activity-time">{a.time}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
