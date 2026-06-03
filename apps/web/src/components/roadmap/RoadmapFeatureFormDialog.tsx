import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_ROADMAP_FORM_VALUE,
  ROADMAP_PRIORITIES,
  ROADMAP_PRODUCT_AREAS,
  ROADMAP_STATUSES,
} from "../../constants/roadmapConstants";
import type {
  RoadmapFeatureCreateInput,
  RoadmapPriority,
  RoadmapStatus,
} from "../../types/roadmap";
import { AppDropdown } from "../ui/AppDropdown";

type RoadmapFeatureFormMode = "create" | "edit";

type RoadmapFeatureFormDialogProps = {
  initialValue?: RoadmapFeatureCreateInput;
  isSubmitting: boolean;
  mode: RoadmapFeatureFormMode;
  onHide: () => void;
  onSubmit: (input: RoadmapFeatureCreateInput) => void;
  visible: boolean;
};

function readFormValue(
  formData: FormData,
  key: keyof RoadmapFeatureCreateInput,
) {
  return String(formData.get(key) ?? "").trim();
}

function readNumberFormValue(
  formData: FormData,
  key: keyof RoadmapFeatureCreateInput,
) {
  return Number(formData.get(key) ?? 0);
}

function RoadmapFeatureFormDialog({
  initialValue = DEFAULT_ROADMAP_FORM_VALUE,
  isSubmitting,
  mode,
  onHide,
  onSubmit,
  visible,
}: RoadmapFeatureFormDialogProps) {
  const [form, setForm] = useState<RoadmapFeatureCreateInput>(initialValue);
  const { t } = useTranslation();
  const isCreate = mode === "create";
  const header = isCreate ? t("roadmap.create") : t("roadmap.edit");
  const submitLabel = isCreate ? t("roadmap.create") : t("common.saveChanges");
  const submittingLabel = isCreate ? t("roadmap.creating") : t("common.saving");
  const submitIcon = isCreate ? "pi pi-plus" : "pi pi-save";
  const isValid = Boolean(
    form.title.trim() &&
    form.description.trim() &&
    form.owner.trim() &&
    form.milestone.trim(),
  );

  useEffect(() => {
    if (visible) {
      setForm(initialValue);
    }
  }, [initialValue, visible]);

  function updateForm<
    Value extends RoadmapFeatureCreateInput[keyof RoadmapFeatureCreateInput],
  >(key: keyof RoadmapFeatureCreateInput, value: Value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitAction(formData: FormData) {
    const input: RoadmapFeatureCreateInput = {
      title: readFormValue(formData, "title"),
      description: readFormValue(formData, "description"),
      owner: readFormValue(formData, "owner"),
      milestone: readFormValue(formData, "milestone"),
      status: readFormValue(formData, "status") as RoadmapStatus,
      priority: readFormValue(formData, "priority") as RoadmapPriority,
      productArea: readFormValue(formData, "productArea"),
      linkedFeedbackCount: readNumberFormValue(formData, "linkedFeedbackCount"),
      revenueImpact: readNumberFormValue(formData, "revenueImpact"),
      effort: readNumberFormValue(formData, "effort"),
      strategicValue: readNumberFormValue(formData, "strategicValue"),
    };

    if (
      !input.title ||
      !input.description ||
      !input.owner ||
      !input.milestone
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
            {t("roadmap.form.title")}
          </span>
          <InputText
            name="title"
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder={t("roadmap.form.titlePlaceholder")}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {t("roadmap.form.description")}
          </span>
          <InputText
            name="description"
            value={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
            placeholder={t("roadmap.form.descriptionPlaceholder")}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.owner")}
            </span>
            <InputText
              name="owner"
              value={form.owner}
              onChange={(event) => updateForm("owner", event.target.value)}
              placeholder={t("roadmap.form.ownerPlaceholder")}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.milestone")}
            </span>
            <InputText
              name="milestone"
              value={form.milestone}
              onChange={(event) => updateForm("milestone", event.target.value)}
              placeholder={t("roadmap.form.milestonePlaceholder")}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.status")}
            </span>
            <AppDropdown
              options={ROADMAP_STATUSES}
              value={form.status}
              onChange={(event) => updateForm("status", event.value)}
            />
            <input name="status" type="hidden" value={form.status} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.priority")}
            </span>
            <AppDropdown
              options={ROADMAP_PRIORITIES}
              value={form.priority}
              onChange={(event) => updateForm("priority", event.value)}
            />
            <input name="priority" type="hidden" value={form.priority} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.productArea")}
            </span>
            <AppDropdown
              options={ROADMAP_PRODUCT_AREAS}
              value={form.productArea}
              onChange={(event) => updateForm("productArea", event.value)}
            />
            <input name="productArea" type="hidden" value={form.productArea} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.linkedFeedbackCount")}
            </span>
            <InputNumber
              name="linkedFeedbackCount"
              min={0}
              value={form.linkedFeedbackCount}
              onValueChange={(event) =>
                updateForm("linkedFeedbackCount", event.value ?? 0)
              }
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.revenueImpact")}
            </span>
            <InputNumber
              name="revenueImpact"
              min={0}
              max={100}
              value={form.revenueImpact}
              onValueChange={(event) =>
                updateForm("revenueImpact", event.value ?? 0)
              }
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.effort")}
            </span>
            <InputNumber
              name="effort"
              min={0}
              max={100}
              value={form.effort}
              onValueChange={(event) => updateForm("effort", event.value ?? 0)}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("roadmap.form.strategicValue")}
            </span>
            <InputNumber
              name="strategicValue"
              min={0}
              max={100}
              value={form.strategicValue}
              onValueChange={(event) =>
                updateForm("strategicValue", event.value ?? 0)
              }
            />
          </label>
        </div>

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

export { RoadmapFeatureFormDialog };
