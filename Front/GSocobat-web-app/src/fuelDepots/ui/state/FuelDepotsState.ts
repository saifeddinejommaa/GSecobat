import { create } from "zustand";
import type { FuelDepot } from "../../domain/Models/FuelDepot";
import { FuelDepotRepository } from "../../data/FuelDepotRespository";
import type { PagedResult } from "../../../core/PagedResult";

type FuelDepotsState = {
  depots: PagedResult<FuelDepot>;
  loading: boolean;

  filters: {
    assetType?: number;
    assetStatus?: number;
    serialNumber?: string;
    mch?: string;
    pageNumber: number;
    pageSize: number;
  };

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  fetchDepots: () => Promise<void>;
};


export const useDepotsStore = create<FuelDepotsState>((set, get) => ({
  depots: {items: [], pageNumber:0,pageSize:10,totalCount:0},
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

  clearFilters: () => set({ filters: {pageNumber:1,
    pageSize:10} }),

  fetchDepots: async () => {
    set({ loading: true });

    try {
      const data = await FuelDepotRepository.getAll(get().filters);
      set({ depots: data });
    } finally {
      set({ loading: false });
    }
  },
}));