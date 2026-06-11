export type NavItem = {
  label: string;
  icon: string;
  section: string;
  path?: string;
  badge?: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { icon: "⬡", label: "Dashboard", section: "main", badge: "12", path: "/" },
  { icon: "📊", label: "Analytics", section: "main", path: "/analytics" },
  { icon: "💳", label: "Analyses", section: "main", path: "/analyses" },
  { icon: "👥", label: "Employés", section: "Activities", path: "/employees" },
  { icon: "💼", label: "Missions", section: "Activities", path: "/missions" },
  {
    icon: "🚚",
    label: "Machines",
    section: "Depot",
    children: [
      { label: "Machine list", icon: "📋", section: "Depot", path: "/assets" },
      { label: "Add machine", icon: "➕", section: "Depot", path: "/assets/new" },
    ],
  },
  {
    icon: "🔄", 
    label: "Recharges Machine", 
    section: "Fuel", 
    children: [
      { label: "Recharge Machine list", icon: "📋", section: "Depot", path: "/machineReffils" },
      { label: "Add recharge machine", icon: "➕", section: "Depot", path: "/machineReffils/new" },
    ],
  },
  { icon: "🔄", label: "Recharges Station", section: "Fuel", path: "/depotReffils" },
  { icon: "⛽", label: "Stations", section: "Fuel", path: "/depots" },
  { icon: "⚙️", label: "Paramètres", section: "system", path: "/settings" },
  { icon: "🔔", label: "Notifications", section: "system", path: "/notifications" },
];