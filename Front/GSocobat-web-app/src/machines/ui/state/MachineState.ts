import { create } from "zustand";
import type { Machine } from "../Models/Machine";
import { GetAssetsUseCase } from "../../domain/GetAssetsUseCase";
import type { AssetsRequestFilter } from "../../domain/models/AssetsRequestFilter";
import type { PagedResult } from "../../../core/PagedResult";

type MachineState = {
  machines: PagedResult<Machine>;
  loading: boolean;

  filters: AssetsRequestFilter;

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  fetchMachines: () => Promise<void>;
};


export const useMachineStore = create<MachineState>((set, get) => ({
  machines: {items: [], pageNumber:0,pageSize:10,totalCount:0},
  loading: false,

  filters: {
    pageNumber:1,
    pageSize:10
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  clearFilters: () => set({ filters: {pageNumber:1,
    pageSize:10} }),

  fetchMachines: async () => {
    set({ loading: true });
    try {
      const data = await GetAssetsUseCase(get().filters);
      set({ machines: data });
    } finally {
      set({ loading: false });
    }
  },
}));