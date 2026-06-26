import { create } from "zustand";
import type { Mission } from "../../domain/models/Mission";
import type { MissionRequestFilter } from "../../domain/models/MissionsRequestFIlter";
import { GetMissionsUseCase } from "../../domain/useCases/GetMissionsUseCase";

type MissionsState = {
  missions: Mission[];
  loading: boolean;
  filters: MissionRequestFilter;

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  fetchMissions: () => Promise<void>;
};

export const useMissionsStore = create<MissionsState>((set, get) => ({
  missions: [],
  loading: false,
  filters: {},
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  clearFilters: () => set({ filters: {} }),

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