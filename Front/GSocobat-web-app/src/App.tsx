import GlassDashboard from "./components/FirstScreen";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsPages from './components/pages/SettingsPage';
import UsersPages from './components/pages/UsersPage';
import Layout from './components/Layout';
import AssetsPages from "./machines/ui/pages/MachinesPage";
import FuelDepotsPages from "./fuelDepots/ui/pages/FuelDepotsPages";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<GlassDashboard />} />
          <Route path="/users" element={<UsersPages />} />
          <Route path="/depots" element={<FuelDepotsPages />} />
          <Route path="/settings" element={<SettingsPages />} />
          <Route path="/assets" element={<AssetsPages/>} />
        </Route>
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
