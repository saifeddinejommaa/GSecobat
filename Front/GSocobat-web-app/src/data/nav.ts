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
  { icon: "💳", label: "Analyses", section: "main", path: "/analyses" },
  { icon: "👥", label: "Employés", section: "Activities" , path: "/employees" },
  { icon: "💼", label: "Missions", section: "Activities", path: "/missions" },
  { icon: "🚚", label: "Machines", section: "Depot", path: "/assets" },
  { icon: "🔄", label: "Recharges Machine", section: "Fuel", path: "/machineReffils" },
  { icon: "🔄", label: "Recharges Station", section: "Fuel", path: "/depotReffils" },
  { icon: "⛽", label: "Stations", section: "Fuel", path: "/depots" },
  { icon: "⚙️", label: "Paramètres", section: "system", path: "/settings" },
  { icon: "🔔", label: "Notifications", section: "system", path: "/notifications" },
];