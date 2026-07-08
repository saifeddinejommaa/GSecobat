import { useEffect } from "react";
import { useEmployeeStore } from "./states/EmployeesState";
import OrdersTable from "../../components/tables/OrdersTable";

export default function EmployeesPages() {
  const { employees, fetchEmployees, loading, filters } = useEmployeeStore();
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePageChange = (page: number) => {
    useEmployeeStore.setState((state) => ({
      filters: {
        ...state.filters,
        pageNumber: page,
      },
    }));

    fetchEmployees();
  };

  return (
    <div className="glass-card">
      {<OrdersTable
        data={employees?.items ?? []}
        pageNumber={filters.pageNumber}
        pageSize={filters.pageSize}
        totalCount={employees?.totalCount ?? 0}
        onPageChange={handlePageChange}
        columns={[
          { key: "firstName", label: "Nom" },
          { key: "lastName", label: "Prénom" },
          {
            key: "birthDate", label: "Date de Naissance", render: (item) =>
              item.birthDate
                ? new Date(item.birthDate).toLocaleDateString("fr-FR")
                : "-",
          },
        ]}
      />}
    </div>
  );
}