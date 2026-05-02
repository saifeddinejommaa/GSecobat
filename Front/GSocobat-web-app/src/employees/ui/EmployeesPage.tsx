import { useEffect, useState } from "react";
import OrdersTable from "../../components/tables/OrdersTable";
import { useEmployeeStore } from "./states/EmployeesState";
import { Modal } from "../../common/Widgets/Modal";
import type { Employee } from "../domain/models/Employee";

export default function EmployeesPages() {
  const { employees, fetchEmployees, loading } = useEmployeeStore();
  useEffect(() => {
    fetchEmployees();
  }, []);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee| null>(null);

  return (
    <div className="glass-card">
      <OrdersTable
        onRowClick={(item) => setSelectedEmployee(item)}
        data={employees}
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
      />
      <Modal
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      >
        {selectedEmployee && (
          <div>
            <h2>{selectedEmployee.firstName}</h2>
            <p><b>Prénom:</b> {selectedEmployee.firstName}</p>
            <p><b>Nom:</b> {selectedEmployee.lastName}</p>
            <p><b>Date:</b> {new Date(selectedEmployee.birthDate).toLocaleDateString()}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}