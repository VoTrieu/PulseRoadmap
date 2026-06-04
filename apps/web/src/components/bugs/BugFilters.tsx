import { useTranslation } from "react-i18next";
import {
  BUG_PRODUCT_AREAS,
  BUG_SEVERITIES,
  BUG_STATUSES,
} from "../../constants/bugConstants";
import { ALL_FILTER_VALUE } from "../../constants/filterConstants";
import type { BugFilters as BugFiltersValue } from "../../types/bug";
import type { FilterOption } from "../../types/filter";
import { AppDropdown } from "../ui/AppDropdown";
import { FilterToolbar } from "../ui/FilterToolbar";

type BugFiltersProps = {
  onChange: (filters: BugFiltersValue) => void;
  value: BugFiltersValue;
};

function BugFilters({ onChange, value }: BugFiltersProps) {
  const { t } = useTranslation();
  const severityOptions: FilterOption[] = [
    { label: t("bugs.filter.allSeverities"), value: ALL_FILTER_VALUE },
    ...BUG_SEVERITIES.map((severity) => ({ label: severity, value: severity })),
  ];
  const statusOptions: FilterOption[] = [
    { label: t("bugs.filter.allStatuses"), value: ALL_FILTER_VALUE },
    ...BUG_STATUSES.map((status) => ({ label: status, value: status })),
  ];
  const productAreaOptions: FilterOption[] = [
    { label: t("bugs.filter.allAreas"), value: ALL_FILTER_VALUE },
    ...BUG_PRODUCT_AREAS.map((area) => ({ label: area, value: area })),
  ];
  const hasActiveFilters = Boolean(
    value.search.trim() || value.severity || value.status || value.productArea,
  );

  function updateFilters(nextFilters: Partial<BugFiltersValue>) {
    onChange({ ...value, ...nextFilters });
  }

  function clearFilters() {
    onChange({ search: "" });
  }

  return (
    <FilterToolbar
      clearDisabled={!hasActiveFilters}
      clearLabel={t("bugs.filter.clear")}
      onClear={clearFilters}
      onSearchChange={(search) => updateFilters({ search })}
      searchPlaceholder={t("bugs.searchPlaceholder")}
      searchValue={value.search}
      variant="wide"
    >
      <AppDropdown
        className="w-full xl:w-44"
        optionLabel="label"
        optionValue="value"
        options={severityOptions}
        value={value.severity ?? ALL_FILTER_VALUE}
        onChange={(event) =>
          updateFilters({
            severity: event.value === ALL_FILTER_VALUE ? undefined : event.value,
          })
        }
      />
      <AppDropdown
        className="w-full xl:w-44"
        optionLabel="label"
        optionValue="value"
        options={statusOptions}
        value={value.status ?? ALL_FILTER_VALUE}
        onChange={(event) =>
          updateFilters({
            status: event.value === ALL_FILTER_VALUE ? undefined : event.value,
          })
        }
      />
      <AppDropdown
        className="w-full xl:w-44"
        optionLabel="label"
        optionValue="value"
        options={productAreaOptions}
        value={value.productArea ?? ALL_FILTER_VALUE}
        onChange={(event) =>
          updateFilters({
            productArea:
              event.value === ALL_FILTER_VALUE ? undefined : event.value,
          })
        }
      />
    </FilterToolbar>
  );
}

export { BugFilters };
