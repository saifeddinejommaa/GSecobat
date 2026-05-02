import { useState } from "react";
import type { MachineReffilsRequestFilter } from "../domain/models/requestFilters/MachineReffilRequestFilter";
import { useConstantsStore } from "../../constants/ConstantsState";
import { FuelDepotTypeSelect } from "../../common/Widgets/ConstantSelects/FuelDepotTypeSelect";

export default function MachineReffilsFilters({ onApply }: any) {
  const constants = useConstantsStore((s) => s.constants);
  console.log("CONSTANTS:", constants);
  const [filters, setFilters] = useState<MachineReffilsRequestFilter>({
    assetSerialNumber: "",
    depotName: "",
    fuelDepotTypeId: undefined,
    reffilDate: "",
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

         {/* Fuel Depot Type */}
        <FuelDepotTypeSelect onChange={(e)=> handleChange("fuelDepotTypeId",e ? e.toString() : "")}/>
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