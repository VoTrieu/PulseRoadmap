import { Toast } from "primereact/toast";
import { toastRef } from "../../services/toastService";

function AppToast() {
  return <Toast ref={toastRef} position="top-right" />;
}

export { AppToast };
