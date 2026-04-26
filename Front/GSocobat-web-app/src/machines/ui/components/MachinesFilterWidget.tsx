import { useState } from "react";

export default function MachinesFilters({ onApply }: any) {
  const [filters, setFilters] = useState({
    assetType: "",
    assetStatus: "",
    serialNumber: "",
    statusType: "",
    mch: "",
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
        {/* Asset Type */}
        <select
          onChange={(e) => handleChange("assetType", e.target.value)}
        >
          <option value="">Asset Type</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
        </select>

        {/* Asset Status */}
        <select
          onChange={(e) => handleChange("assetStatus", e.target.value)}
        >
          <option value="">Asset Status</option>
          <option value="1">Active</option>
          <option value="2">Inactive</option>
        </select>

        {/* Serial Number */}
        <input
          type="text"
          placeholder="Serial Number"
          onChange={(e) => handleChange("serialNumber", e.target.value)}
        />

        {/* Status Type */}
        <input
          type="text"
          placeholder="Status Type"
          onChange={(e) => handleChange("statusType", e.target.value)}
        />

        {/* MCH */}
        <input
          type="text"
          placeholder="MCH"
          onChange={(e) => handleChange("mch", e.target.value)}
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