import { confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";

type AppConfirmOptions = {
  acceptLabel?: string;
  rejectLabel?: string;
  header: string;
  message: string;
  onAccept: () => void;
};

function useAppConfirm() {
  const { t } = useTranslation();

  function confirm({
    acceptLabel = t("common.confirm"),
    rejectLabel = t("common.cancel"),
    header,
    message,
    onAccept,
  }: AppConfirmOptions) {
    confirmDialog({
      accept: onAccept,
      acceptClassName: "p-button-danger",
      acceptLabel,
      header,
      icon: "pi pi-exclamation-triangle",
      message,
      rejectLabel,
    });
  }

  return { confirm };
}

export { useAppConfirm };
