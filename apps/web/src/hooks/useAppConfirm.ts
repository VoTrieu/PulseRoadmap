import { confirmDialog } from "primereact/confirmdialog";

type AppConfirmOptions = {
  acceptLabel?: string;
  rejectLabel?: string;
  header: string;
  message: string;
  onAccept: () => void;
};

function useAppConfirm() {
  function confirm({
    acceptLabel = "Confirm",
    rejectLabel = "Cancel",
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
