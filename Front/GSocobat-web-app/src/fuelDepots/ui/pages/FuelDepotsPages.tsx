import { useEffect } from "react";
import OrdersTable from "../../../components/tables/OrdersTable";
import { useDepotsStore } from "../state/FuelDepotsState";
import FuelDepotFilters from "../components/fuelDepotFilterWidget";

export default function FuelDepotsPages() {
  const { depots, fetchDepots, loading } = useDepotsStore();
  useEffect(() => {
    fetchDepots();
  }, []);
  
  return (
    <div className="glass-card">
      <FuelDepotFilters onApply={(filters:any) => {
    useDepotsStore.setState({ filters });
    fetchDepots();
  }}  />
     <OrdersTable
  data={depots}
  columns={[
    { key: "reference", label: "Reference" },
    { key: "depotName", label: "Nom du dépôt" },
    { key: "capacity", label: "Capacité" },
    { key: "currentLevel", label: "Niveau actuel" },
    {
      key: "type",
      label: "Type"
    },
     {
      key: "locationAddress",
      label: "Adresse de la localisation"
    }
  ]}
/>
    </div>
  );
}