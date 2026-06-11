import { useState } from "react";
import type { FuelDepotRequestFilter } from "../../domain/Models/FuelDepotRequestFilter";
import { FuelDepotTypeSelect } from "../../../common/Widgets/ConstantSelects/FuelDepotTypeSelect";

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
        <FuelDepotTypeSelect onChange={(e) =>
            handleChange(
              "typeId",
              e? Number(e) : null
            )
          }/>
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