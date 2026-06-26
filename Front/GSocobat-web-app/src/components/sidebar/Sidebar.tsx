import { useEffect, useState } from "react";
import { navItems } from "../../data/nav";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";



export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    { key: "main", label: "Principal" },
    { key: "Activities", label: "Activité" },
    { key: "Depot", label: "Dépots" },
    { key: "Fuel", label: "Recharge Carburant" },
    { key: "system", label: "Système" },
  ];

  // Auto-open parent when child route is active
  useEffect(() => {
    navItems.forEach((n) => {
      if (n.children?.some((c) => c.path === location.pathname)) {
        setOpenMenu(n.label);
      }
    });
  }, [location.pathname]);

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
              .map((n) => {
                const isOpen = openMenu === n.label;

                const isParentActive =
                  n.path === location.pathname ||
                  n.children?.some((c) => c.path === location.pathname);

                return (
                  <div key={n.label}>
                    {/* PARENT */}
                    <div
                      className={`nav-item ${
                        isParentActive ? "active" : ""
                      }`}
                      onClick={() => {
                        if (n.children) {
                          setOpenMenu(isOpen ? null : n.label);
                          return;
                        }

                        if (n.path) navigate(n.path);
                      }}
                    >
                      <span className="nav-icon">{n.icon}</span>
                      <span>{n.label}</span>

                      {n.children && (
                        <span className="arrow">
                          {isOpen ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      )}
                    </div>

                    {/* CHILDREN */}
                    {n.children && isOpen && (
                      <div className="nav-children">
                        {n.children.map((child) => {
                          const isChildActive =
                            child.path === location.pathname;

                          return (
                            <div
                              key={child.label}
                              className={`nav-item nav-item--child ${
                                isChildActive ? "active" : ""
                              }`}
                              onClick={() => {
                                if (child.path) navigate(child.path);
                              }}
                            >
                              <span className="nav-icon">
                                {child.icon}
                              </span>
                              <span>{child.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
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