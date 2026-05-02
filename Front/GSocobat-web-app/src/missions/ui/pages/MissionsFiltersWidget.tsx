import { useState } from "react";
import type { MissionRequestFilter } from "../../domain/models/MissionsRequestFIlter";

export default function MissionsFiltersWidget({ onApply }: any) {
  
  const [filters, setFilters] = useState<MissionRequestFilter>({
    EmployeeName: "",
    missionTypeId: undefined,
  });

  const handleChange = (key: string, value: string) => {
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
          <div className="card-sub">Filter assets list</div>
        </div>
      </div>

      <div className="filters-grid">
        {/* Serial Number */}
        <input
          type="text"
          placeholder="Série de la machine"
          onChange={(e) => handleChange("assetSerialNumber", e.target.value)}
        />

        {/* Depot Name */}
        <input
          type="text"
          placeholder="Nom du dépot"
          onChange={(e) => handleChange("depotName", e.target.value)}
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