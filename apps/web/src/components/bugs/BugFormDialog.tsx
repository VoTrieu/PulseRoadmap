import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BUG_PRODUCT_AREAS,
  BUG_SEVERITIES,
  BUG_SOURCES,
  BUG_STATUSES,
  DEFAULT_BUG_FORM_VALUE,
} from "../../constants/bugConstants";
import type {
  BugReportCreateInput,
  BugSeverity,
  BugStatus,
} from "../../types/bug";
import { AppDropdown } from "../ui/AppDropdown";

type BugFormMode = "create" | "edit";

type BugFormDialogProps = {
  initialValue?: BugReportCreateInput;
  isSubmitting: boolean;
  mode: BugFormMode;
  onHide: () => void;
  onSubmit: (input: BugReportCreateInput) => void;
  visible: boolean;
};

function readFormValue(formData: FormData, key: keyof BugReportCreateInput) {
  return String(formData.get(key) ?? "").trim();
}

function BugFormDialog({
  initialValue = DEFAULT_BUG_FORM_VALUE,
  isSubmitting,
  mode,
  onHide,
  onSubmit,
  visible,
}: BugFormDialogProps) {
  const [form, setForm] = useState<BugReportCreateInput>(initialValue);
  const { t } = useTranslation();
  const isCreate = mode === "create";
  const header = isCreate ? t("bugs.create") : t("bugs.edit");
  const submitLabel = isCreate ? t("bugs.create") : t("common.saveChanges");
  const submittingLabel = isCreate ? t("bugs.creating") : t("common.saving");
  const submitIcon = isCreate ? "pi pi-plus" : "pi pi-save";
  const isValid = Boolean(
    form.title.trim() &&
      form.customer.trim() &&
      form.assignee.trim() &&
      form.reproductionSteps.trim(),
  );

  useEffect(() => {
    if (visible) {
      setForm(initialValue);
    }
  }, [initialValue, visible]);

  function updateForm<Value extends BugReportCreateInput[keyof BugReportCreateInput]>(
    key: keyof BugReportCreateInput,
    value: Value,
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitAction(formData: FormData) {
    const input: BugReportCreateInput = {
      title: readFormValue(formData, "title"),
      customer: readFormValue(formData, "customer"),
      productArea: readFormValue(formData, "productArea"),
      severity: readFormValue(formData, "severity") as BugSeverity,
      status: readFormValue(formData, "status") as BugStatus,
      assignee: readFormValue(formData, "assignee"),
      source: readFormValue(formData, "source"),
      reproductionSteps: readFormValue(formData, "reproductionSteps"),
      linkedRelease: readFormValue(formData, "linkedRelease"),
      reportedAt: readFormValue(formData, "reportedAt"),
    };

    if (
      !input.title ||
      !input.customer ||
      !input.assignee ||
      !input.reproductionSteps
    ) {
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
      className="w-[min(46rem,calc(100vw-2rem))]"
      header={header}
      modal
      onHide={handleHide}
      visible={visible}
    >
      <form action={submitAction} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {t("bugs.form.title")}
          </span>
          <InputText
            name="title"
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder={t("bugs.form.titlePlaceholder")}
            value={form.title}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.customer")}
            </span>
            <InputText
              name="customer"
              onChange={(event) => updateForm("customer", event.target.value)}
              placeholder={t("bugs.form.customerPlaceholder")}
              value={form.customer}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.assignee")}
            </span>
            <InputText
              name="assignee"
              onChange={(event) => updateForm("assignee", event.target.value)}
              placeholder={t("bugs.form.assigneePlaceholder")}
              value={form.assignee}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.productArea")}
            </span>
            <AppDropdown
              onChange={(event) => updateForm("productArea", event.value)}
              options={BUG_PRODUCT_AREAS}
              value={form.productArea}
            />
            <input name="productArea" type="hidden" value={form.productArea} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.severity")}
            </span>
            <AppDropdown
              onChange={(event) => updateForm("severity", event.value)}
              options={BUG_SEVERITIES}
              value={form.severity}
            />
            <input name="severity" type="hidden" value={form.severity} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.status")}
            </span>
            <AppDropdown
              onChange={(event) => updateForm("status", event.value)}
              options={BUG_STATUSES}
              value={form.status}
            />
            <input name="status" type="hidden" value={form.status} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.source")}
            </span>
            <AppDropdown
              onChange={(event) => updateForm("source", event.value)}
              options={BUG_SOURCES}
              value={form.source}
            />
            <input name="source" type="hidden" value={form.source} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.linkedRelease")}
            </span>
            <InputText
              name="linkedRelease"
              onChange={(event) =>
                updateForm("linkedRelease", event.target.value)
              }
              placeholder={t("bugs.form.linkedReleasePlaceholder")}
              value={form.linkedRelease}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("bugs.reported")}
            </span>
            <InputText
              name="reportedAt"
              onChange={(event) => updateForm("reportedAt", event.target.value)}
              placeholder="Jun 04"
              value={form.reportedAt}
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {t("bugs.reproductionSteps")}
          </span>
          <InputTextarea
            autoResize
            name="reproductionSteps"
            onChange={(event) =>
              updateForm("reproductionSteps", event.target.value)
            }
            placeholder={t("bugs.form.reproductionStepsPlaceholder")}
            rows={4}
            value={form.reproductionSteps}
          />
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            label={t("common.cancel")}
            onClick={handleHide}
            outlined
            type="button"
          />
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

export { BugFormDialog };
