import { useState } from "react";
import Select from "react-select";
import { customStyles } from "../../common/customStyles/SelectCustomStyles";

type Props<T> = {
  placeholder?: string;
  width?: number | string;

  useSearch: (query: string) => {
    results: T[];
    loading: boolean;
  };

  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
};

export function Autocomplete<T>({
  placeholder = "Rechercher...",
  width = 400,
  useSearch,
  getLabel,
  onSelect,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const { results, loading } = useSearch(query);

  const options = results.map((item) => ({
    label: getLabel(item),
    value: item,
  }));

  return (
    <div style={{ width }}>
      <Select
        placeholder={placeholder}
        isLoading={loading}
        options={options}
        onInputChange={(value) => {
          setQuery(value);
          return value;
        }}
        styles={customStyles}
        onChange={(selected) => {
          if (selected) {
            onSelect(selected.value);
          }
        }}
        filterOption={() => true}
      />
    </div>
  );
}