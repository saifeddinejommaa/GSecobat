import { create } from "zustand";
import type { DepotReffil } from "../../domain/models/DepotReffil";
import { DepotReffilRepository } from "../../data/repositories/DepotReffilRepository";
import type { DepotReffilRequestFilter } from "../../domain/models/DepotReffilRequestFilter";
import type { PagedResult } from "../../../core/PagedResult";

type DepotReffilState = {
    DepotReffils: PagedResult<DepotReffil>;
    loading: boolean;
    filters: DepotReffilRequestFilter;
    setFilter: (key: string, value: any) => void;
    clearFilters: () => void;
    fetchDepotReffils: () => Promise<void>;
};


export const useDepotReffilsStore = create<DepotReffilState>((set, get) => ({
    DepotReffils: { items: [], pageNumber: 0, pageSize: 10, totalCount: 0 },
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
    fetchDepotReffils: async () => {
        set({ loading: true });
        try {
            const data = await DepotReffilRepository.getAll(get().filters);
            set({ DepotReffils: data });
        } finally {
            set({ loading: false });
        }
    },
}));