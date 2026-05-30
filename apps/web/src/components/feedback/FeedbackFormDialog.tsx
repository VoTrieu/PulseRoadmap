import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CUSTOMER_TIERS,
  DEFAULT_FEEDBACK_FORM_VALUE,
  FEEDBACK_PRODUCT_AREAS,
  FEEDBACK_SENTIMENTS,
  FEEDBACK_SOURCES,
  FEEDBACK_URGENCIES,
} from "../../constants/feedbackConstants";
import type {
  CustomerTier,
  FeedbackCreateInput,
  FeedbackSentiment,
  FeedbackUrgency,
} from "../../types/feedback";
import { AppDropdown } from "../ui/AppDropdown";

type FeedbackFormMode = "create" | "edit";

type FeedbackFormDialogProps = {
  initialValue?: FeedbackCreateInput;
  isSubmitting: boolean;
  mode: FeedbackFormMode;
  onHide: () => void;
  onSubmit: (input: FeedbackCreateInput) => void;
  visible: boolean;
};

function readFormValue(formData: FormData, key: keyof FeedbackCreateInput) {
  return String(formData.get(key) ?? "").trim();
}

function FeedbackFormDialog({
  initialValue = DEFAULT_FEEDBACK_FORM_VALUE,
  isSubmitting,
  mode,
  onHide,
  onSubmit,
  visible,
}: FeedbackFormDialogProps) {
  const [form, setForm] = useState<FeedbackCreateInput>(initialValue);
  const { t } = useTranslation();
  const isValid = Boolean(
    form.customer.trim() && form.request.trim() && form.linkedFeature.trim(),
  );
  const isCreate = mode === "create";
  const header = isCreate ? t("feedback.add") : t("feedback.edit");
  const submitLabel = isCreate ? t("feedback.add") : t("common.saveChanges");
  const submittingLabel = isCreate ? t("feedback.adding") : t("common.saving");
  const submitIcon = isCreate ? "pi pi-plus" : "pi pi-save";

  useEffect(() => {
    if (visible) {
      setForm(initialValue);
    }
  }, [initialValue, visible]);

  function updateForm<
    Value extends FeedbackCreateInput[keyof FeedbackCreateInput],
  >(key: keyof FeedbackCreateInput, value: Value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitAction(formData: FormData) {
    const input: FeedbackCreateInput = {
      customer: readFormValue(formData, "customer"),
      request: readFormValue(formData, "request"),
      productArea: readFormValue(formData, "productArea"),
      sentiment: readFormValue(formData, "sentiment") as FeedbackSentiment,
      tier: readFormValue(formData, "tier") as CustomerTier,
      urgency: readFormValue(formData, "urgency") as FeedbackUrgency,
      source: readFormValue(formData, "source"),
      linkedFeature: readFormValue(formData, "linkedFeature"),
      receivedAt: readFormValue(formData, "receivedAt"),
    };

    if (!input.customer || !input.request || !input.linkedFeature) {
      return;
    }

    onSubmit(input);
  }

  function handleHide() {
    if (!isSubmitting) {
      onHide();
    }
  }

  return (
    <Dialog
      className="w-[min(42rem,calc(100vw-2rem))]"
      header={header}
      modal
      onHide={handleHide}
      visible={visible}
    >
      <form action={submitAction} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">{t("feedback.customer")}</span>
          <InputText
            name="customer"
            value={form.customer}
            onChange={(event) => updateForm("customer", event.target.value)}
            placeholder={t("feedback.customerPlaceholder")}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">{t("feedback.request")}</span>
          <InputText
            name="request"
            value={form.request}
            onChange={(event) => updateForm("request", event.target.value)}
            placeholder={t("feedback.form.requestPlaceholder")}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("feedback.form.productArea")}
            </span>
            <AppDropdown
              options={FEEDBACK_PRODUCT_AREAS}
              value={form.productArea}
              onChange={(event) => updateForm("productArea", event.value)}
            />
            <input name="productArea" type="hidden" value={form.productArea} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("feedback.customerTier")}
            </span>
            <AppDropdown
              options={CUSTOMER_TIERS}
              value={form.tier}
              onChange={(event) => updateForm("tier", event.value)}
            />
            <input name="tier" type="hidden" value={form.tier} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("feedback.sentiment")}
            </span>
            <AppDropdown
              options={FEEDBACK_SENTIMENTS}
              value={form.sentiment}
              onChange={(event) => updateForm("sentiment", event.value)}
            />
            <input name="sentiment" type="hidden" value={form.sentiment} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("feedback.urgency")}
            </span>
            <AppDropdown
              options={FEEDBACK_URGENCIES}
              value={form.urgency}
              onChange={(event) => updateForm("urgency", event.value)}
            />
            <input name="urgency" type="hidden" value={form.urgency} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">{t("feedback.source")}</span>
            <AppDropdown
              options={FEEDBACK_SOURCES}
              value={form.source}
              onChange={(event) => updateForm("source", event.value)}
            />
            <input name="source" type="hidden" value={form.source} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("feedback.form.received")}
            </span>
            <InputText
              name="receivedAt"
              value={form.receivedAt}
              onChange={(event) => updateForm("receivedAt", event.target.value)}
              placeholder="May 18"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {t("feedback.linkedFeature")}
          </span>
          <InputText
            name="linkedFeature"
            value={form.linkedFeature}
            onChange={(event) =>
              updateForm("linkedFeature", event.target.value)
            }
            placeholder={t("feedback.linkedFeaturePlaceholder")}
          />
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button label={t("common.cancel")} onClick={handleHide} outlined type="button" />
          <Button
            disabled={!isValid || isSubmitting}
            icon={isSubmitting ? "pi pi-spin pi-spinner" : submitIcon}
            label={isSubmitting ? submittingLabel : submitLabel}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}

export { FeedbackFormDialog };
