import Select from "react-select";
import { useConstantsStore } from "../../../constants/ConstantsState";
import { customStyles } from "../../customStyles/SelectCustomStyles";

type Option = {
  value: number;
  label: string;
};

type FuelDepotTypesSelectProps = {
  onChange: (value?: number) => void;
};

export function FuelDepotTypeSelect({ onChange }: FuelDepotTypesSelectProps) {
  const assetTypes = useConstantsStore((s) => s.constants.fuelDepotTypes);

  const options: Option[] = assetTypes.map((t) => ({
    value: t.id,
    label: t.label,
  }));

  return (
    <Select
      options={options}
      onChange={(selected) => onChange((selected as Option | null)?.value)}
      placeholder="Type du dépot"
      styles={customStyles}
      isClearable
    />
  );
}