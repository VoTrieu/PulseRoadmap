import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_RELEASE_FORM_VALUE,
  RELEASE_STATUSES,
  RELEASE_TYPES,
} from "../../constants/releaseConstant";
import type {
  ReleaseCreateInput,
  ReleaseStatus,
  ReleaseType,
} from "../../types/release";
import { AppDropdown } from "../ui/AppDropdown";

type ReleaseFormMode = "create" | "edit";

type ReleaseFormDialogProps = {
  initialValue?: ReleaseCreateInput;
  isSubmitting: boolean;
  mode: ReleaseFormMode;
  onHide: () => void;
  onSubmit: (input: ReleaseCreateInput) => void;
  visible: boolean;
};

function readFormValue(formData: FormData, key: keyof ReleaseCreateInput) {
  return String(formData.get(key) ?? "").trim();
}

function parseIdList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatIdList(value: string[]) {
  return value.join(", ");
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date());
}

function ReleaseFormDialog({
  initialValue = DEFAULT_RELEASE_FORM_VALUE,
  isSubmitting,
  mode,
  onHide,
  onSubmit,
  visible,
}: ReleaseFormDialogProps) {
  const [form, setForm] = useState<ReleaseCreateInput>(initialValue);
  const { t } = useTranslation();
  const isCreate = mode === "create";
  const header = isCreate ? t("releases.create") : t("releases.edit");
  const submitLabel = isCreate
    ? t("releases.create")
    : t("common.saveChanges");
  const submittingLabel = isCreate
    ? t("releases.creating")
    : t("common.saving");
  const submitIcon = isCreate ? "pi pi-plus" : "pi pi-save";
  const isValid = Boolean(
    form.name.trim() &&
      form.version.trim() &&
      form.owner.trim() &&
      form.targetDate.trim() &&
      form.summary.trim() &&
      form.internalNotes.trim() &&
      (!form.isPublic || form.publicNotes.trim()),
  );

  useEffect(() => {
    if (visible) {
      setForm(initialValue);
    }
  }, [initialValue, visible]);

  function updateForm<
    Value extends ReleaseCreateInput[keyof ReleaseCreateInput],
  >(key: keyof ReleaseCreateInput, value: Value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleStatusChange(status: ReleaseStatus) {
    setForm((current) => ({
      ...current,
      status,
      shippedAt:
        status === "Shipped" && !current.shippedAt
          ? getTodayLabel()
          : current.shippedAt,
    }));
  }

  function submitAction(formData: FormData) {
    const isPublic = readFormValue(formData, "isPublic") === "true";
    const input: ReleaseCreateInput = {
      name: readFormValue(formData, "name"),
      version: readFormValue(formData, "version"),
      status: readFormValue(formData, "status") as ReleaseStatus,
      releaseType: readFormValue(formData, "releaseType") as ReleaseType,
      owner: readFormValue(formData, "owner"),
      targetDate: readFormValue(formData, "targetDate"),
      shippedAt: readFormValue(formData, "shippedAt") || null,
      summary: readFormValue(formData, "summary"),
      internalNotes: readFormValue(formData, "internalNotes"),
      publicNotes: readFormValue(formData, "publicNotes"),
      includedFeatureIds: parseIdList(
        readFormValue(formData, "includedFeatureIds"),
      ),
      includedBugIds: parseIdList(readFormValue(formData, "includedBugIds")),
      isPublic,
    };

    if (
      !input.name ||
      !input.version ||
      !input.owner ||
      !input.targetDate ||
      !input.summary ||
      !input.internalNotes ||
      (input.isPublic && !input.publicNotes)
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
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.name")}
            </span>
            <InputText
              name="name"
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder={t("releases.form.namePlaceholder")}
              value={form.name}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.version")}
            </span>
            <InputText
              name="version"
              onChange={(event) => updateForm("version", event.target.value)}
              placeholder={t("releases.form.versionPlaceholder")}
              value={form.version}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.status")}
            </span>
            <AppDropdown
              onChange={(event) => handleStatusChange(event.value)}
              options={RELEASE_STATUSES}
              value={form.status}
            />
            <input name="status" type="hidden" value={form.status} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.releaseType")}
            </span>
            <AppDropdown
              onChange={(event) => updateForm("releaseType", event.value)}
              options={RELEASE_TYPES}
              value={form.releaseType}
            />
            <input name="releaseType" type="hidden" value={form.releaseType} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.owner")}
            </span>
            <InputText
              name="owner"
              onChange={(event) => updateForm("owner", event.target.value)}
              placeholder={t("releases.form.ownerPlaceholder")}
              value={form.owner}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.targetDate")}
            </span>
            <InputText
              name="targetDate"
              onChange={(event) => updateForm("targetDate", event.target.value)}
              placeholder="Jun 30"
              value={form.targetDate}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.shippedAt")}
            </span>
            <InputText
              name="shippedAt"
              onChange={(event) =>
                updateForm("shippedAt", event.target.value || null)
              }
              placeholder={t("releases.form.shippedAtPlaceholder")}
              value={form.shippedAt ?? ""}
            />
          </label>

          <label className="flex items-center gap-3 pt-6">
            <Checkbox
              checked={form.isPublic}
              inputId="release-is-public"
              onChange={(event) => updateForm("isPublic", Boolean(event.checked))}
            />
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.form.isPublic")}
            </span>
            <input name="isPublic" type="hidden" value={String(form.isPublic)} />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {t("releases.summary")}
          </span>
          <InputTextarea
            autoResize
            name="summary"
            onChange={(event) => updateForm("summary", event.target.value)}
            placeholder={t("releases.form.summaryPlaceholder")}
            rows={3}
            value={form.summary}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.internalNotes")}
            </span>
            <InputTextarea
              autoResize
              name="internalNotes"
              onChange={(event) =>
                updateForm("internalNotes", event.target.value)
              }
              placeholder={t("releases.form.internalNotesPlaceholder")}
              rows={4}
              value={form.internalNotes}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.publicNotes")}
            </span>
            <InputTextarea
              autoResize
              name="publicNotes"
              onChange={(event) => updateForm("publicNotes", event.target.value)}
              placeholder={t("releases.form.publicNotesPlaceholder")}
              rows={4}
              value={form.publicNotes}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.includedFeatureIds")}
            </span>
            <InputText
              name="includedFeatureIds"
              onChange={(event) =>
                updateForm("includedFeatureIds", parseIdList(event.target.value))
              }
              placeholder="rf-123, rf-456"
              value={formatIdList(form.includedFeatureIds)}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("releases.includedBugIds")}
            </span>
            <InputText
              name="includedBugIds"
              onChange={(event) =>
                updateForm("includedBugIds", parseIdList(event.target.value))
              }
              placeholder="bug-123, bug-456"
              value={formatIdList(form.includedBugIds)}
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

export { ReleaseFormDialog };
