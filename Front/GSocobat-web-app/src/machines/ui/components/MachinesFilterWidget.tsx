import { useState } from "react";
import { AssetTypesSelect } from "../../../common/Widgets/ConstantSelects/AssetTypesSelect";
import type { AssetsRequestFilter } from "../../domain/models/AssetsRequestFilter";
import { AssetStatusesSelect } from "../../../common/Widgets/ConstantSelects/AssetStatusesSelect";

export default function MachinesFilters({ onApply }: any) {
  const [filters, setFilters] = useState<AssetsRequestFilter>({
    assetStatus: undefined,
    serialNumber: "",
    assetTypeId: undefined,
    mch: "",
  });

  const handleChange = <K extends keyof AssetsRequestFilter>(
      key: K,
      value: AssetsRequestFilter[K]
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
          <div className="card-sub">Filter assets list</div>
        </div>
      </div>

      <div className="filters-grid">
        {/* Asset Type */}
        <AssetTypesSelect onChange={(e) => handleChange("assetTypeId",  e? Number(e) : undefined)}></AssetTypesSelect>

        {/* Asset Status */}
        <AssetStatusesSelect onChange={(e) => handleChange("assetStatus",e? Number(e) : undefined )}/>
       
        {/* Serial Number */}
        <input
          type="text"
          placeholder="Serial Number"
          onChange={(e) => handleChange("serialNumber", e.target.value)}
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