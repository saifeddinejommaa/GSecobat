import GlassDashboard from "./components/FirstScreen";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsPages from './components/pages/SettingsPage';
import Layout from './components/Layout';
import AssetsPages from "./machines/ui/pages/MachinesPage";
import FuelDepotsPages from "./fuelDepots/ui/pages/FuelDepotsPages";
import FuelReffilPages from "./machineReffil/ui/MachineReffilsPage";
import EmployeesPages from "./employees/ui/EmployeesPage";

import { useEffect } from "react";
import { useConstantsStore } from "./constants/ConstantsState";
import MissionsPage from "./missions/ui/pages/MissionsPage";
import DepotReffilsPages from "./DepotReffils/ui/pages/DepotReffilsPage";

function App() {
  const {fetchConstants} = useConstantsStore();

  useEffect(() => {
    fetchConstants();
  }, []);
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<GlassDashboard />} />
          <Route path="/employees" element={<EmployeesPages />} />
          <Route path="/depots" element={<FuelDepotsPages />} />
          <Route path="/settings" element={<SettingsPages />} />
          <Route path="/assets" element={<AssetsPages/>} />
          <Route path="/machineReffils" element={<FuelReffilPages/>} />
          <Route path="/depotReffils" element={<DepotReffilsPages/>} />
          <Route path="/missions" element={<MissionsPage/>} />
        </Route>
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
