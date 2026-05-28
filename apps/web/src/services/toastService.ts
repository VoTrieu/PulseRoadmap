import type { Toast } from "primereact/toast";
import { createRef } from "react";

const toastRef = createRef<Toast>();

function showErrorToast(message: string) {
  toastRef.current?.show({
    severity: "error",
    summary: "Request failed",
    detail: message,
    life: 3000,
    closable: true,
  });
}

export { toastRef, showErrorToast };
