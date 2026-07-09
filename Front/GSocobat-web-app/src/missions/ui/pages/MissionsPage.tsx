import { useEffect } from "react";
//import OrdersTable from "../../../components/tables/OrdersTable";
import { useMissionsStore } from "../state/MissionsState";
import MissionsFiltersWidget from "./MissionsFiltersWidget";
import OrdersTable from "../../../components/tables/OrdersTable";

export default function MissionsPage() {
  const { missions, fetchMissions,filters } = useMissionsStore();
  useEffect(() => {
    fetchMissions();
  }, []);
   const handlePageChange = (page: number) => {
        useMissionsStore.setState((state) => ({
          filters: {
            ...state.filters,
            pageNumber: page,
          },
        }));
    
        fetchMissions();
      };
  return (
    <div className="glass-card">
      <MissionsFiltersWidget onApply={(filters:any) => {
    useMissionsStore.setState({ filters });
    fetchMissions();
  }}  />
     <OrdersTable
  data={missions?.items ?? []}
  pageNumber={filters.pageNumber}
        pageSize={filters.pageSize}
        totalCount={missions?.totalCount ?? 0}
  onPageChange={handlePageChange}
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