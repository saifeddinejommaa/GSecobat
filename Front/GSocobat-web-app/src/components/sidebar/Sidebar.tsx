import { navItems } from "../../data/nav";
import { useNavigate } from "react-router-dom";

type Props = {
  activeNav: string;
  setActiveNav: (value: string) => void;
};

export default function Sidebar({ activeNav, setActiveNav }: Props) {
  const sections = [
    { key: "main", label: "Principal" },
    { key: "commerce", label: "Commerce" },
    { key: "marketing", label: "Marketing" },
    { key: "system", label: "Système" },
  ];

const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="logo-area">
        <div className="logo-icon">✦</div>
        <div>
          <div className="logo-text">GSecobat</div>
          <div className="logo-sub">Admin Console</div>
        </div>
      </div>

      <nav className="nav-section">
        {sections.map((sec) => (
          <div key={sec.key}>
            <div className="nav-label">{sec.label}</div>

            {navItems
              .filter((n) => n.section === sec.key)
              .map((n) => (
                <div
                  key={n.label}
                  className={`nav-item ${
                    activeNav === n.label ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav(n.label);
                    navigate(n.path);
                  }}
                >
                  <span className="nav-icon">{n.icon}</span>
                  <span>{n.label}</span>
                  {n.badge && (
                    <span className="nav-badge">{n.badge}</span>
                  )}
                </div>
              ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar">ML</div>
          <div>
            <div className="user-name">Marc Lefèvre</div>
            <div className="user-role">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}