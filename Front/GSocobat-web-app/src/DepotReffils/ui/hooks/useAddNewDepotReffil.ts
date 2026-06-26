import { useState } from "react";
import type { AddDepotReffilRequest } from "../../data/requests/AddDepotReffilRequest";
import { AddDepotReffilUseCase } from "../../domain/usecases/AddDepotReffilUseCase";

export const useAddDepotReffil = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addDepotReffil = async (request: AddDepotReffilRequest) => {
     setLoading(true);
     setError(null);
     try {
       const success = await AddDepotReffilUseCase(request);
 
       if (!success) {
         throw new Error("Failed to add depot reffil");
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
     addDepotReffil,
     loading,
     error,
   };
 };