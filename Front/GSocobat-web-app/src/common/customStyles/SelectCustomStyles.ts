export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "10px",
    minHeight: "38px",
    boxShadow: "none",
    backdropFilter: "blur(12px)",
    transition: "all 0.2s ease",
    cursor: "pointer",

    ...(state.isFocused && {
      borderColor: "#6c8cff",
    }),

    "&:hover": {
      background: "rgba(255,255,255,0.06)",
    },
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: "0 10px",
  display: "flex",
  alignItems: "center",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#e2e8f0",
    fontSize: "13px",
  }),

  placeholder: (base: any) => ({
    ...base,
    color: "#64748b",
    fontSize: "13px",
  }),

 input: (base: any) => ({
    ...base,
    color: "white",
  }),

  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    color: state.isFocused ? "#e2e8f0" : "#64748b",
    transition: "0.2s",
    "&:hover": {
      color: "#e2e8f0",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  // 🔥 DROPDOWN PROPRE
  menu: (base: any) => ({
  ...base,
  background: "#0c1030",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  marginTop: "6px",
  padding: "4px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
  zIndex: 9999,
}),

  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),

  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "rgba(108,140,255,0.25)"
      : state.isFocused
      ? "rgba(255,255,255,0.08)"
      : "transparent",
    color: "#e2e8f0",
    padding: "9px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",

    "&:active": {
      backgroundColor: "rgba(108,140,255,0.35)",
    },
  }),

  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};