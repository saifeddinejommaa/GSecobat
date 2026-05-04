import { useState } from "react";
import { useMachineAutocomplete } from "../hooks/UseMachineAutoComplete";

export function MachineAutocomplete({ onSelect }: any) {
  const [query, setQuery] = useState("");
  const { results, loading } = useMachineAutocomplete(query);

  return (
    <div style={{ position: "relative" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
      />

      {results.length > 0 && (
        <div className="autocomplete-dropdown">
          {results.map((m: any) => (
            <div key={m.id} onClick={() => onSelect(m)}>
              {m.serialNumber}
            </div>
          ))}
        </div>
      )}

      {loading && <div>Loading...</div>}
    </div>
  );
}