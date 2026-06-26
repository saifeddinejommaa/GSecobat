import { useEffect } from "react";
import OrdersTable from "../../../components/tables/OrdersTable";
import { useDepotsStore } from "../state/FuelDepotsState";
import FuelDepotFilters from "../widgets/fuelDepotFilterWidget";

export default function FuelDepotsPages() {
  const { depots, fetchDepots,filters, loading } = useDepotsStore();
  useEffect(() => {
    fetchDepots();
  }, []);

  const handlePageChange = (page: number) => {
      useDepotsStore.setState((state) => ({
        filters: {
          ...state.filters,
          pageNumber: page,
        },
      }));
  
      fetchDepots();
    };
  
  return (
    <div className="glass-card">
      <FuelDepotFilters onApply={(filters:any) => {
    useDepotsStore.setState({ filters });
    fetchDepots();
  }}  />
     <OrdersTable
  data={depots.items}
   pageNumber={filters.pageNumber}
        pageSize={filters.pageSize}
        totalCount={depots?.totalCount ?? 0}
        onPageChange={handlePageChange}
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