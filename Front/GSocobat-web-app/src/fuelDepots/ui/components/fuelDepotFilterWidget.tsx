import { useState } from "react";
import type { FuelDepotRequestFilter } from "../../domain/Models/FuelDepotRequestFilter";

type Props = {
  onApply: (filters: FuelDepotRequestFilter) => void;
};

export default function FuelDepotFilters({ onApply}: Props) {
  const [filters, setFilters] = useState<FuelDepotRequestFilter>({
    reference: "",
    typeId: null,
    locationId: null,
    name: "",
  });

  const handleChange = <K extends keyof FuelDepotRequestFilter>(
    key: K,
    value: FuelDepotRequestFilter[K]
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
          <div className="card-sub">Filter fuel depots list</div>
        </div>
      </div>

      <div className="filters-grid">
        {/* Reference */}
        <input
          type="text"
          placeholder="Reference"
          value={filters.reference ?? ""}
          onChange={(e) => handleChange("reference", e.target.value)}
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={filters.name ?? ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {/* Type */}
        <select
          value={filters.typeId ?? ""}
          onChange={(e) =>
            handleChange(
              "typeId",
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Type</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
        </select>

        {/* Location */}
        <select
          value={filters.locationId ?? ""}
          onChange={(e) =>
            handleChange(
              "locationId",
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Location</option>
          <option value="1">Location 1</option>
          <option value="2">Location 2</option>
        </select>
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