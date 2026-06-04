import type { ReactNode } from "react";
import { Button } from "primereact/button";
import { FilterSearchInput } from "./FilterSearchInput";

type FilterToolbarProps = {
  children: ReactNode;
  clearDisabled: boolean;
  clearLabel: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchValue: string;
  variant?: "default" | "wide";
};

function FilterToolbar({
  children,
  clearDisabled,
  clearLabel,
  onClear,
  onSearchChange,
  searchPlaceholder,
  searchValue,
  variant = "default",
}: FilterToolbarProps) {
  const responsiveClass =
    variant === "wide"
      ? "xl:flex-row xl:items-center"
      : "lg:flex-row lg:items-center";

  return (
    <div
      className={`mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm ${responsiveClass}`}
    >
      <FilterSearchInput
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        value={searchValue}
      />
      {children}
      <Button
        className="min-h-11 border-slate-300 px-4 font-bold text-slate-700"
        disabled={clearDisabled}
        icon="pi pi-filter-slash"
        label={clearLabel}
        onClick={onClear}
        outlined
      />
    </div>
  );
}

export { FilterToolbar };
