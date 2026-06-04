import { useTranslation } from "react-i18next";
import type { RoadmapFilters } from "../../types/roadmap";
import {
  ROADMAP_STATUSES,
  ROADMAP_PRIORITIES,
  ROADMAP_PRODUCT_AREAS,
} from "../../constants/roadmapConstants";
import { ALL_FILTER_VALUE } from "../../constants/filterConstants";
import type { FilterOption } from "../../types/filter";
import { AppDropdown } from "../ui/AppDropdown";
import { FilterToolbar } from "../ui/FilterToolbar";

type RoadmapFiltersProps = {
  onChange: (filters: RoadmapFilters) => void;
  value: RoadmapFilters;
};

function RoadmapFilters({ onChange, value }: RoadmapFiltersProps) {
  const { t } = useTranslation();
  const statusOptions: FilterOption[] = [
    { label: t("roadmap.filter.allStatuses"), value: ALL_FILTER_VALUE },
    ...ROADMAP_STATUSES.map((status) => ({ label: status, value: status })),
  ];
  const priorityOptions: FilterOption[] = [
    { label: t("roadmap.filter.allPriorities"), value: ALL_FILTER_VALUE },
    ...ROADMAP_PRIORITIES.map((priority) => ({
      label: priority,
      value: priority,
    })),
  ];
  const productAreaOptions: FilterOption[] = [
    { label: t("roadmap.filter.allProductAreas"), value: ALL_FILTER_VALUE },
    ...ROADMAP_PRODUCT_AREAS.map((area) => ({ label: area, value: area })),
  ];

  const hasActiveFilters = Boolean(
    value.search.trim() || value.status || value.priority || value.productArea,
  );

  function updateFilters(nextFilters: Partial<RoadmapFilters>) {
    onChange({
      ...value,
      ...nextFilters,
    });
  }

  function clearFilters() {
    onChange({
      search: "",
    });
  }

  return (
    <FilterToolbar
      clearDisabled={!hasActiveFilters}
      clearLabel={t("roadmap.filter.clear")}
      onClear={clearFilters}
      onSearchChange={(search) => updateFilters({ search })}
      searchPlaceholder={t("roadmap.searchPlaceholder")}
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
        options={priorityOptions}
        value={value.priority ?? ALL_FILTER_VALUE}
        onChange={(event) =>
          updateFilters({
            priority:
              event.value === ALL_FILTER_VALUE ? undefined : event.value,
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

export { RoadmapFilters };
