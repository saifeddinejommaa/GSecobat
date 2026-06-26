import { useState } from "react";
import type { AddMachineRequest } from "../../data/requests/AddMachineRequest";
import { AddMachineUseCase } from "../../domain/useCases/AddMachineUseCase";

export const useAddMachine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMachine = async (request: AddMachineRequest) => {
     setLoading(true);
     setError(null);
     try {
       const success = await AddMachineUseCase(request);
 
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
     addMachine,
     loading,
     error,
   };
 };