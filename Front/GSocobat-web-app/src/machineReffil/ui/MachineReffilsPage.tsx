import { useEffect } from "react";
import OrdersTable from "../../components/tables/OrdersTable";
import { useMachineReffilsStore } from "./state/MachineReffilsState";
import MachineReffilsFilters from "./MachineReffilsFilterWidget";

export default function MachineReffilsPages() {
  const { machinesReffils, fetchMachineReffils, filters } = useMachineReffilsStore();
  useEffect(() => {
    fetchMachineReffils();
  }, []);

  return (
    <div className="glass-card">
      <div className="card-header">
        <div>
          <div className="card-title">Liste des recharges machines</div>
          <div className="card-sub">Gestion des remplissages</div>
        </div>
      </div>
      <MachineReffilsFilters onApply={(filters: any) => {
        useMachineReffilsStore.setState({ filters });
        fetchMachineReffils();
      }} />
      <OrdersTable
        data={machinesReffils?.items ?? []}
        pageSize={filters.pageSize}
        pageNumber={filters.pageNumber}
        totalCount={machinesReffils.totalCount}
        onPageChange={(page) => {
          useMachineReffilsStore.setState((state) => ({
            filters: {
              ...state.filters,
              pageNumber: page,
            },
          }));

          fetchMachineReffils();
        }}
        columns={[
          {
            key: "reffilDate", label: "Date", render: (item) =>
              item.reffilDate
                ? new Date(item.reffilDate).toLocaleDateString("fr-FR")
                : "-",
          },
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
            render: (item) => (item.isFull ? "Oui" : "Non"),
          },
        ]}
      />
    </div>
  );
}