import { create } from "zustand";
import type { Constants } from "./domain/Models/Constants";
import { getConstants } from "./domain/useCases/GetConstants";

type ConstantsState = {
  constants: Constants;
  loading: boolean;
  fetchConstants: () => Promise<void>;
};

export const useConstantsStore = create<ConstantsState>((set) => ({
   constants: {
     locationTypes: [],
      assetStatuses: [],
      assetTypes: [],
      fuelDepotTypes: [],
   },
  loading: false,

  fetchConstants: async () => {
    set({ loading: true });

    try {
      const data = await getConstants();

      set({
        constants: data,
      });
    } finally {
      set({ loading: false });
    }
  },
}));