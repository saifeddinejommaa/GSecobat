import { create } from "zustand";
import type { Mission } from "../../domain/models/Mission";
import type { MissionRequestFilter } from "../../domain/models/MissionsRequestFIlter";
import { GetMissionsUseCase } from "../../domain/useCases/GetMissionsUseCase";
import type { PagedResult } from "../../../core/PagedResult";

type MissionsState = {
  missions: PagedResult<Mission>;
  loading: boolean;
  filters: MissionRequestFilter;

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  fetchMissions: () => Promise<void>;
};

export const useMissionsStore = create<MissionsState>((set, get) => ({
  missions: { items: [], pageNumber: 0, pageSize: 10, totalCount: 0 },
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

  clearFilters: () => set({ filters: {
            pageNumber: 1,
            pageSize: 10
        } }),

  fetchMissions: async () => {
    set({ loading: true });
    try {
      const data = await GetMissionsUseCase(get().filters);
      set({ missions: data });
    } finally {
      set({ loading: false });
    }
  },
}));