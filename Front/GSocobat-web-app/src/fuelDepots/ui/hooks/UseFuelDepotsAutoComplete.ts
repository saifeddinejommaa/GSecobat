import { useEffect, useState } from "react";
import type { FuelDepot } from "../../domain/Models/FuelDepot";
import { GetFuelDepotsUseCase } from "../../domain/GetFuelDepotsUseCase";

export function useFuelDepotAutocomplete(serialNumber:string) {
  const [results, setResults] = useState<FuelDepot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("query",serialNumber)
    if (!serialNumber || serialNumber.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const data = await GetFuelDepotsUseCase({serialNumber:serialNumber});
       console.log("data",data)
      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [serialNumber]);

  return { results, loading };
}
