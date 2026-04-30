export type NavItem = {
  label: string;
  icon: string;
  section: string;
  path: string; 
  badge?: string;
};

export const navItems: NavItem[] = [
  { icon: "⬡", label: "Dashboard", section: "main", badge: "12" , path: "/" },
  { icon: "📊", label: "Analytics", section: "main", path: "/analytics" },
  { icon: "👥", label: "Utilisateurs", section: "main", badge: "12" , path: "/users" },
  { icon: "💼", label: "Maintenances", section: "main", path: "/maintenance" },
  { icon: "🛍", label: "Commandes", section: "commerce", badge: "4" , path: "/orders" },
  { icon: "🚚", label: "Machines", section: "main", path: "/assets" },
  { icon: "💳", label: "Analyses", section: "commerce", path: "/analyses" },
  { icon: "⛽🔄", label: "Rechargement", section: "marketing", path: "/machineReffils" },
  { icon: "⛽", label: "Stations", section: "marketing", path: "/depots" },
  { icon: "⚙️", label: "Paramètres", section: "system", path: "/settings" },
  { icon: "🔔", label: "Notifications", section: "system", path: "/notifications" },
];