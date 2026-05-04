import { useEffect } from "react";
import OrdersTable from "../../../components/tables/OrdersTable";
import MachinesFilters from "../widgets/MachinesFilterWidget";
import { useMachineStore } from "../state/MachineState";

export default function MachinesPages() {
  const { machines, fetchMachines, loading } = useMachineStore();
  useEffect(() => {
    fetchMachines();
  }, []);
  
  return (
    <div className="glass-card">
      <MachinesFilters onApply={(filters:any) => {
    useMachineStore.setState({ filters });
    fetchMachines();
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