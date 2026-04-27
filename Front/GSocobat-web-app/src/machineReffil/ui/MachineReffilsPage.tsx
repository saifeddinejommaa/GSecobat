import { useEffect } from "react";
import { useMachineStore } from "../../machines/ui/state/MachineState";
import FuelReffilsFilters from "./MachineReffilsFilterWidget";
import OrdersTable from "../../components/tables/OrdersTable";

export default function FuelReffilPages() {
  const { machines, fetchFuelReffils, loading } = useFuelReffilsStore();
  useEffect(() => {
    fetchFuelReffils();
  }, []);
  
  return (
    <div className="glass-card">
      <FuelReffilsFilters onApply={(filters:any) => {
    useMachineStore.setState({ filters });
    fetchFuelReffils();
  }}  />
     <OrdersTable
  data={machines}
  columns={[
    { key: "id", label: "ID" },
    { key: "serialNumber", label: "Serial" },
    { key: "typeLabel", label: "Type" },
    { key: "assetStatusLabel", label: "Status" },
    {
      key: "mch",
      label: "MCH",
      render: (item) => item.mch ?? "-",
    },
  ]}
/>
    </div>
  );
}