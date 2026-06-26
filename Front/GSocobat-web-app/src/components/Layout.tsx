import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";

export default function Layout() {
    const [activeNav, setActiveNav] = useState("Dashboard");
  return (
    <div className="shell">
      <Sidebar  activeNav={activeNav}
        setActiveNav={setActiveNav}/>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}