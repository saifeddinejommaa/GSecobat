import { create } from "zustand";
import type { MachineReffil } from "../../domain/models/MachineReffil";

type MachineReffilsState = {
  machinesReffils: MachineReffil[];
  loading: boolean;

  filters: {
    assetType?: number;
    assetStatus?: number;
    serialNumber?: string;
    mch?: string;
  };

  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  fetchMachineReffils: () => Promise<void>;
};


export const useMachineReffilsStore = create<MachineReffilsState>((set, get) => ({
  machinesReffils: [],
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

  fetchMachineReffils: async () => {
    set({ loading: true });

    try {
      const data = await MachineReffilsRepository.getAll(get().filters);
      set({ machinesReffils: data.Response });
    } finally {
      set({ loading: false });
    }
  },
}));