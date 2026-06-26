import { useState } from "react";
import type { DepotReffilRequestFilter } from "../../domain/models/DepotReffilRequestFilter";

type Props = {
  onApply: (filters: DepotReffilRequestFilter) => void;
};

export default function DepotReffilsFilters({ onApply}: Props) {
  const [filters, setFilters] = useState<DepotReffilRequestFilter>({
    fuelDepotRef : null,
    reffilDate : null,
    fuelDepotId : null
  });

  const handleChange = <K extends keyof DepotReffilRequestFilter>(
    key: K,
    value: DepotReffilRequestFilter[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="glass-card" style={{ marginBottom: 16 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Filters</div>
        </div>
      </div>

      <div className="filters-grid">
        {/* Reference */}
        <input
          type="text"
          placeholder="Reference"
          value={filters.fuelDepotRef ?? ""}
          onChange={(e) => handleChange("fuelDepotRef", e.target.value)}
        />

        {/* Reference */}
        <input
          type="text"
          placeholder="Numéro Depot"
          value={filters.fuelDepotId ?? ""}
          onChange={(e) => handleChange("fuelDepotId", Number(e.target.value))}
        />
        
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: 12 }}
        onClick={() => onApply(filters)}
      >
        Apply filters
      </button>
    </div>
  );
}