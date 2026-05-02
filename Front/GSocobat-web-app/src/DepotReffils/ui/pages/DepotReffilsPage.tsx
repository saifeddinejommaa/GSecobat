import { useEffect } from "react";
import { useDepotReffilsStore } from "../state/DepotReffilsState";
import OrdersTable from "../../../components/tables/OrdersTable";
import DepotReffilsFilters from "../widgets/DepotReffilsFilterWidget";

export default function DepotReffilsPages() {
  const { DepotReffils, fetchDepotReffils, loading } = useDepotReffilsStore();
  useEffect(() => {
    fetchDepotReffils();
  }, []);
  
  return (
    <div className="glass-card">
        <DepotReffilsFilters onApply={(filters:any) => {
            useDepotReffilsStore.setState({ filters });
            fetchDepotReffils();
          }}  />
     <OrdersTable
  data={DepotReffils}
  columns={[
    { key: "fuelDepotRef", label: "Référence" },
    { key: "fuelDpotName", label: "Nom Dépot" },
    { key: "quantity", label: "Quantité" },
    { key: "reffilDate", label: "Date de Naissance", render: (item) =>
    item.reffilDate
      ? new Date(item.reffilDate).toLocaleDateString("fr-FR")
      : "-", },
  ]}
/>
    </div>
  );
}