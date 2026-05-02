import { create } from "zustand";
import type { Employee } from "../../domain/models/Employee";
import { EmployeesRepository } from "../../data/repositories/EmployeesRepository";

type EmployeeState = {
  employees: Employee[];
  loading: boolean;

  fetchEmployees: () => Promise<void>;
};


export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  loading: false,

  fetchEmployees: async () => {
    set({ loading: true });
    try {
      const data = await EmployeesRepository.getAll();
      set({ employees: data });
    } finally {
      set({ loading: false });
    }
  },    
}));