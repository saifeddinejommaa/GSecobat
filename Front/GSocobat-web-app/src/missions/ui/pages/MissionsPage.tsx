import { useEffect } from "react";
import OrdersTable from "../../../components/tables/OrdersTable";
import { useMissionsStore } from "../state/MissionsState";
import MissionsFiltersWidget from "./MissionsFiltersWidget";

export default function MissionsPage() {
  const { missions, fetchMissions, loading } = useMissionsStore();
  useEffect(() => {
    fetchMissions();
  }, []);
  
  return (
    <div className="glass-card">
      <MissionsFiltersWidget onApply={(filters:any) => {
    useMissionsStore.setState({ filters });
    fetchMissions();
  }}  />
     <OrdersTable
  data={missions}
  columns={[
    { key: "employeeName", label: "Nom Employee" },
    { key: "distance", label: "Distance" },
    { key: "hours", label: "Nb Heure" },
    { key: "missionTitle", label: "Titre" },
    { key: "missionDesc", label: "Description"},
  ]}
/>
    </div>
  );
}