import { useState } from "react";
import "../styles/Global.css";
import { kpis } from "../data/kpis";
import { barData } from "../data/bar";
import { activities } from "../data/activities";
import DonutChart from "./charts/DonutChart";
import { donutData } from "../data/donut";

const orders = [
  { id: "#8821", client: "Marie Dupont", amount: "340 €", status: "Livré", color: "#34d399" },
  { id: "#8820", client: "Julien Martin", amount: "128 €", status: "En cours", color: "#6c8cff" },
  { id: "#8819", client: "Sarah Cohen", amount: "892 €", status: "En attente", color: "#fbbf24" },
  { id: "#8818", client: "Tom Bernard", amount: "55 €", status: "Annulé", color: "#f472b6" },
];

export default function GlassDashboard() {
  const [activeChip, setActiveChip] = useState("7j");
  return (
    <>
      <div className="shell">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

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
