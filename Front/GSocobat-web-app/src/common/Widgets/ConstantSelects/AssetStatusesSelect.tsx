import Select from "react-select";
import { useConstantsStore } from "../../../constants/ConstantsState";
import { customStyles } from "../../customStyles/SelectCustomStyles";

type Option = {
  value: number;
  label: string;
};

type AssetStatusesSelectProps = {
  onChange: (value?: number) => void;
};

export function AssetStatusesSelect({ onChange }: AssetStatusesSelectProps) {
  const assetStatuses = useConstantsStore((s) => s.constants.assetStatuses);

  const options: Option[] = assetStatuses.map((t) => ({
    value: t.id,
    label: t.label,
  }));

  return (
    <Select
      menuPortalTarget={document.body}
      menuPosition="fixed"
      options={options}
      onChange={(selected) => onChange((selected as Option | null)?.value)}
      placeholder="Etat de la Machine"
      styles={customStyles}
      isClearable
    />
  );
}