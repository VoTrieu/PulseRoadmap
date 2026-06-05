import { useTranslation } from "react-i18next";
import {
  RELEASE_STATUSES,
  RELEASE_TYPES,
  RELEASE_VISIBILITY_OPTIONS,
} from "../../constants/releaseConstant";
import { ALL_FILTER_VALUE } from "../../constants/filterConstants";
import type { FilterOption } from "../../types/filter";
import type { ReleaseFilters as ReleaseFiltersValue } from "../../types/release";
import { AppDropdown } from "../ui/AppDropdown";
import { FilterToolbar } from "../ui/FilterToolbar";

type ReleaseFiltersProps = {
  onChange: (filters: ReleaseFiltersValue) => void;
  value: ReleaseFiltersValue;
};

function ReleaseFilters({ onChange, value }: ReleaseFiltersProps) {
  const { t } = useTranslation();

  const statusOptions: FilterOption[] = [
    { label: t("releases.filter.allStatuses"), value: ALL_FILTER_VALUE },
    ...RELEASE_STATUSES.map((status) => ({ label: status, value: status })),
  ];

  const typeOptions: FilterOption[] = [
    { label: t("releases.filter.allTypes"), value: ALL_FILTER_VALUE },
    ...RELEASE_TYPES.map((releaseType) => ({
      label: releaseType,
      value: releaseType,
    })),
  ];

  const visibilityOptions: FilterOption[] = RELEASE_VISIBILITY_OPTIONS.map(
    (option) => ({
      label:
        option.value === "all"
          ? t("releases.filter.allVisibility")
          : option.value === "public"
            ? t("releases.visibility.public")
            : t("releases.visibility.internal"),
      value: option.value,
    }),
  );

  const visibilityValue =
    value.isPublic === undefined
      ? ALL_FILTER_VALUE
      : value.isPublic
        ? "public"
        : "internal";

  const hasActiveFilters = Boolean(
    value.search.trim() ||
      value.status ||
      value.releaseType ||
      value.isPublic !== undefined,
  );

  function updateFilters(nextFilters: Partial<ReleaseFiltersValue>) {
    onChange({
      ...value,
      ...nextFilters,
    });
  }

  function clearFilters() {
    onChange({ search: "" });
  }

  function handleVisibilityChange(nextValue: string) {
    if (nextValue === ALL_FILTER_VALUE) {
      updateFilters({ isPublic: undefined });
      return;
    }

    updateFilters({ isPublic: nextValue === "public" });
  }

  return (
    <FilterToolbar
      clearDisabled={!hasActiveFilters}
      clearLabel={t("releases.filter.clear")}
      onClear={clearFilters}
      onSearchChange={(search) => updateFilters({ search })}
      searchPlaceholder={t("releases.searchPlaceholder")}
      searchValue={value.search}
      variant="wide"
    >
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
        options={typeOptions}
        value={value.releaseType ?? ALL_FILTER_VALUE}
        onChange={(event) =>
          updateFilters({
            releaseType:
              event.value === ALL_FILTER_VALUE ? undefined : event.value,
          })
        }
      />

      <AppDropdown
        className="w-full xl:w-44"
        optionLabel="label"
        optionValue="value"
        options={visibilityOptions}
        value={visibilityValue}
        onChange={(event) => handleVisibilityChange(event.value)}
      />
    </FilterToolbar>
  );
}

export { ReleaseFilters };
