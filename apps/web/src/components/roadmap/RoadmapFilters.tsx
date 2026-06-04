import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import type { RoadmapFilters } from "../../types/roadmap";
import {
  ROADMAP_STATUSES,
  ROADMAP_PRIORITIES,
  ROADMAP_PRODUCT_AREAS,
} from "../../constants/roadmapConstants";
import { AppDropdown } from "../ui/AppDropdown";

type FilterOption = {
  label: string;
  value: string;
};

type RoadmapFiltersProps = {
  onChange: (filters: RoadmapFilters) => void;
  value: RoadmapFilters;
};

const ALL_FILTER_VALUE = "all";

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
    <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm xl:flex-row xl:items-center">
      <div className="flex min-h-11 min-w-64 flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
        <i
          className="pi pi-search shrink-0 text-base text-slate-500"
          aria-hidden="true"
        />
        <InputText
          className="w-full border-none p-0 shadow-none"
          onChange={(event) => updateFilters({ search: event.target.value })}
          placeholder={t("roadmap.searchPlaceholder")}
          value={value.search}
        />
      </div>

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

      <Button
        className="min-h-11 border-slate-300 px-4 font-bold text-slate-700"
        disabled={!hasActiveFilters}
        icon="pi pi-filter-slash"
        label={t("roadmap.filter.clear")}
        onClick={clearFilters}
        outlined
      />
    </div>
  );
}

export { RoadmapFilters };
