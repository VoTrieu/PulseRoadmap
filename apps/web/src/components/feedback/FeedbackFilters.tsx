import {
  FEEDBACK_PRODUCT_AREAS,
  FEEDBACK_URGENCIES,
} from "../../constants/feedbackConstants";
import { ALL_FILTER_VALUE } from "../../constants/filterConstants";
import type { FeedbackListFilters } from "../../types/feedback";
import type { FilterOption } from "../../types/filter";
import { useTranslation } from "react-i18next";
import { AppDropdown } from "../ui/AppDropdown";
import { FilterToolbar } from "../ui/FilterToolbar";

type FeedbackFiltersProps = {
  onChange: (filters: FeedbackListFilters) => void;
  value: FeedbackListFilters;
};

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
    <FilterToolbar
      clearDisabled={!hasActiveFilters}
      clearLabel={t("feedback.filter.clear")}
      onClear={clearFilters}
      onSearchChange={(search) => updateFilters({ search })}
      searchPlaceholder={t("feedback.searchPlaceholder")}
      searchValue={value.search}
    >
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
    </FilterToolbar>
  );
}

export { FeedbackFilters };
