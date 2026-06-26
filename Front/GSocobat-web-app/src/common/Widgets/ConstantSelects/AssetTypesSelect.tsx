import Select from "react-select";
import { useConstantsStore } from "../../../constants/ConstantsState";
import { customStyles } from "../../customStyles/SelectCustomStyles";

type Option = {
  value: number;
  label: string;
};

type AssetTypesSelectProps = {
  onChange: (value?: number) => void;
};

export function AssetTypesSelect({ onChange }: AssetTypesSelectProps) {
  const assetTypes = useConstantsStore((s) => s.constants.assetTypes);

  const options: Option[] = assetTypes.map((t) => ({
    value: t.id,
    label: t.label,
  }));

  return (
    <Select
      menuPortalTarget={document.body}
      menuPosition="fixed"
      options={options}
      onChange={(selected) => onChange((selected as Option | null)?.value)}
      placeholder="Machine Type"
      styles={customStyles}
      isClearable
    />
  );
}