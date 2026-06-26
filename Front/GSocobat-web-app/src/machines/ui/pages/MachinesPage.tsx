import { useEffect } from "react";
import OrdersTable from "../../../components/tables/OrdersTable";
import MachinesFilters from "../widgets/MachinesFilterWidget";
import { useMachineStore } from "../state/MachineState";

export default function MachinesPages() {
  const { machines, filters, fetchMachines } = useMachineStore();

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  const handleApplyFilters = (newFilters: any) => {
    useMachineStore.setState({
      filters: {
        ...newFilters,
        pageNumber: 1,
      },
    });

    fetchMachines();
  };

  const handlePageChange = (page: number) => {
    useMachineStore.setState((state) => ({
      filters: {
        ...state.filters,
        pageNumber: page,
      },
    }));

    fetchMachines();
  };

  return (
    <div className="page-content">
      <MachinesFilters onApply={handleApplyFilters} />

      <OrdersTable
        data={machines?.items ?? []}
        pageNumber={filters.pageNumber}
        pageSize={filters.pageSize}
        totalCount={machines?.totalCount ?? 0}
        onPageChange={handlePageChange}
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