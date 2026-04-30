import { useEffect } from "react";
import OrdersTable from "../../components/tables/OrdersTable";
import { useMachineReffilsStore } from "./state/MachineReffilsState";
import MachineReffilsFilters from "./MachineReffilsFilterWidget";

export default function MachineReffilsPages() {
  const { machinesReffils, fetchMachineReffils, loading } = useMachineReffilsStore();
  useEffect(() => {
    fetchMachineReffils();
  }, []);
  
  return (
    <div className="glass-card">
      <MachineReffilsFilters onApply={(filters:any) => {
    useMachineReffilsStore.setState({ filters });
    fetchMachineReffils();
  }}  />
     <OrdersTable
  data={machinesReffils}
  columns={[
    { key: "reffilDate", label: "Date" },
    { key: "assetSerialNumber", label: "Numéro Machine" },
    { key: "depotName", label: "Dépôt" },
    {
      key: "quantity",
      label: "Quantité",
      render: (item) => item.quantity ?? "-",
    },
    {
      key: "isFull",
      label: "Est Pleine",
      render: (item) => (item.isFull ? "Oui" : "Non") ,
    },
  ]}
/>
    </div>
  );
}