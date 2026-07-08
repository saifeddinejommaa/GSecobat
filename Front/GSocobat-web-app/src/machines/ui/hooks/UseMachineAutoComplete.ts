import { useEffect, useState } from "react";
import { GetAssetsUseCase } from "../../domain/GetAssetsUseCase";
import type { Asset } from "../../domain/models/Asset";

export function useMachineAutocomplete(serialNmber:string) {
  const [results, setResults] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("query",serialNmber)
    if (!serialNmber || serialNmber.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const data = await GetAssetsUseCase({pageNumber:1, pageSize:10,serialNumber:serialNmber});
       console.log("data",data)
      setResults(data.items);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [serialNmber]);

  return { results, loading };
}