import { useActionState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/apiError";
import { ErrorState } from "../ui/ErrorState";

type CreateWorkspaceDialogProps = {
  onHide: () => void;
  visible: boolean;
};

type CreateWorkspaceFormState = {
  error: string | null;
};

const initialState: CreateWorkspaceFormState = {
  error: null,
};

function CreateWorkspaceDialog({ onHide, visible }: CreateWorkspaceDialogProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const { createOrganizationForCurrentUser } = useAuth();

  const [state, formAction, isPending] = useActionState(
    async (_previousState: CreateWorkspaceFormState, formData: FormData) => {
      try {
        await createOrganizationForCurrentUser({
          name: String(formData.get("name") ?? ""),
        });
        formRef.current?.reset();
        onHide();

        return initialState;
      } catch (error) {
        return { error: getErrorMessage(error) };
      }
    },
    initialState,
  );

  return (
    <Dialog
      className="w-[min(32rem,calc(100vw-2rem))]"
      header={t("workspace.create.title")}
      modal
      onHide={onHide}
      visible={visible}
    >
      <form ref={formRef} action={formAction} className="space-y-5">
        {state.error ? (
          <ErrorState
            message={state.error}
            title={t("workspace.create.errorTitle")}
          />
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            {t("workspace.name")}
          </span>
          <InputText
            autoFocus
            className="w-full"
            name="name"
            placeholder={t("workspace.namePlaceholder")}
            required
          />
        </label>

        <div className="flex justify-end gap-3">
          <Button
            label={t("common.cancel")}
            onClick={onHide}
            outlined
            type="button"
          />
          <Button
            icon="pi pi-plus"
            label={
              isPending
                ? t("workspace.create.creating")
                : t("workspace.create.submit")
            }
            loading={isPending}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}

export { CreateWorkspaceDialog };
