import { useState } from "react";
import type { AddMachineReffilRequest } from "../../data/requests/AddMachineReffilRequest";
import { AddMachineReffilUseCase } from "../../domain/useCases/AddMachineReffilUseCase";

export const useAddMachineReffil = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMachineReffil = async (request: AddMachineReffilRequest) => {
    setLoading(true);
    setError(null);
    try {
      const success = await AddMachineReffilUseCase(request);

      if (!success) {
        throw new Error("Failed to add machine reffil");
      }

      return true;
    } catch (e: any) {
      setError(e.message ?? "Unexpected error");
      return false;

    } finally {
      setLoading(false);
    }
  };

  return {
    addMachineReffil,
    loading,
    error,
  };
};