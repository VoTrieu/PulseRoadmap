import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { ProgressBar } from "primereact/progressbar";

function AppNetworkProgress() {
  const fetchingCount = useIsFetching();
  const mutatingCount = useIsMutating();
  const isBusy = fetchingCount + mutatingCount > 0;

  if (!isBusy) {
    return null;
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-9999">
      <ProgressBar mode="indeterminate" style={{ height: "3px" }} />
    </div>
  );
}

export { AppNetworkProgress };
