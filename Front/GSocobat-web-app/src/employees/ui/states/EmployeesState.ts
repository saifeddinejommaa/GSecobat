import { create } from "zustand";
import type { Employee } from "../../domain/models/Employee";
import { EmployeesRepository } from "../../data/repositories/EmployeesRepository";
import type { EmployeesRequestFilter } from "../../domain/models/EmployeesRequestFilter";
import type { PagedResult } from "../../../core/PagedResult";

type EmployeeState = {
  employees: PagedResult<Employee>;
  loading: boolean;
  filters: EmployeesRequestFilter;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  fetchEmployees: () => Promise<void>;
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: { items: [], pageNumber: 0, pageSize: 10, totalCount: 0 },
  loading: false,
  filters: {
    pageNumber: 1,
    pageSize: 10
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  clearFilters: () => set({
    filters: {
      pageNumber: 1,
      pageSize: 10
    }
  }),

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