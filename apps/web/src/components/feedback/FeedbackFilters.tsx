import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  FEEDBACK_PRODUCT_AREAS,
  FEEDBACK_URGENCIES,
} from "../../constants/feedbackConstants";
import type { FeedbackListFilters } from "../../types/feedback";
import { useTranslation } from "react-i18next";
import { AppDropdown } from "../ui/AppDropdown";

type FilterOption = {
  label: string;
  value: string;
};

type FeedbackFiltersProps = {
  onChange: (filters: FeedbackListFilters) => void;
  value: FeedbackListFilters;
};

const ALL_FILTER_VALUE = "all";

function FeedbackFilters({ onChange, value }: FeedbackFiltersProps) {
  const { t } = useTranslation();
  const productAreaOptions: FilterOption[] = [
    { label: t("feedback.filter.allAreas"), value: ALL_FILTER_VALUE },
    ...FEEDBACK_PRODUCT_AREAS.map((area) => ({ label: area, value: area })),
  ];
  const urgencyOptions: FilterOption[] = [
    { label: t("feedback.filter.allUrgency"), value: ALL_FILTER_VALUE },
    ...FEEDBACK_URGENCIES.map((urgency) => ({ label: urgency, value: urgency })),
  ];

  function updateFilters(nextFilters: Partial<FeedbackListFilters>) {
    onChange({ ...value, ...nextFilters });
  }

  function clearFilters() {
    onChange({ search: "" });
  }

  const hasActiveFilters = Boolean(
    value.search.trim() || value.productArea || value.urgency,
  );

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
      <div className="flex min-h-11 min-w-64 flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
        <i className="pi pi-search shrink-0 text-base text-slate-500" aria-hidden="true" />
        <InputText
          className="w-full border-none p-0 shadow-none"
          onChange={(event) => updateFilters({ search: event.target.value })}
          placeholder={t("feedback.searchPlaceholder")}
          value={value.search}
        />
      </div>
      <AppDropdown
        className="w-full lg:w-48"
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
      <AppDropdown
        className="w-full lg:w-48"
        optionLabel="label"
        optionValue="value"
        options={urgencyOptions}
        value={value.urgency ?? ALL_FILTER_VALUE}
        onChange={(event) =>
          updateFilters({
            urgency: event.value === ALL_FILTER_VALUE ? undefined : event.value,
          })
        }
      />
      <Button
        className="min-h-11 border-slate-300 px-4 font-bold text-slate-700"
        disabled={!hasActiveFilters}
        icon="pi pi-filter-slash"
        label={t("feedback.filter.clear")}
        onClick={clearFilters}
        outlined
      />
    </div>
  );
}

export { FeedbackFilters };
