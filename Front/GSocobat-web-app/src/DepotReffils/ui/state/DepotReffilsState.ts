import { create } from "zustand";
import type { DepotReffil } from "../../domain/models/DepotReffil";
import { DepotReffilRepository } from "../../data/repositories/DepotReffilRepository";
import type { DepotReffilRequestFilter } from "../../domain/models/DepotReffilRequestFilter";

type DepotReffilState = {
    DepotReffils: DepotReffil[];
    loading: boolean;
    filters: DepotReffilRequestFilter
    fetchDepotReffils: () => Promise<void>;
};


export const useDepotReffilsStore = create<DepotReffilState>((set, get) => ({
    DepotReffils: [],
    loading: false,
    filters: {
        fuelDepotId: null,
        fuelDepotRef: null,
        reffilDate: null
    },
    fetchDepotReffils: async () => {
        set({ loading: true });
        try {
            const data = await DepotReffilRepository.getAll();
            set({ DepotReffils: data });
        } finally {
            set({ loading: false });
        }
    },
}));