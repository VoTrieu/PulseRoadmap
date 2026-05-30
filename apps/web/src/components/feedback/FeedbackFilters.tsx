import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FEEDBACK_PRODUCT_AREAS, FEEDBACK_URGENCIES } from "../../constants/feedbackConstants";
import { useTranslation } from "react-i18next";
import { AppDropdown } from "../ui/AppDropdown";

function FeedbackFilters() {
  const { t } = useTranslation();
  const productAreas = [t("feedback.filter.allAreas"), ...FEEDBACK_PRODUCT_AREAS];
  const urgencyOptions = [t("feedback.filter.allUrgency"), ...FEEDBACK_URGENCIES];

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
      <div className="flex min-h-11 min-w-64 flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
        <i className="pi pi-search shrink-0 text-base text-slate-500" aria-hidden="true" />
        <InputText
          className="w-full border-none p-0 shadow-none"
          placeholder={t("feedback.searchPlaceholder")}
        />
      </div>
      <AppDropdown
        className="w-full lg:w-48"
        options={productAreas}
        value={productAreas[0]}
      />
      <AppDropdown
        className="w-full lg:w-48"
        options={urgencyOptions}
        value={urgencyOptions[0]}
      />
      <Button
        className="min-h-11 border-slate-300 px-4 font-bold text-slate-700"
        icon="pi pi-filter"
        label={t("common.filters")}
        outlined
      />
    </div>
  );
}

export { FeedbackFilters };
