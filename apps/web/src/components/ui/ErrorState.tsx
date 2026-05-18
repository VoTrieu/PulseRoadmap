import { Button } from "primereact/button";
import { AppCard } from "./AppCard";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
  title: string;
};

function ErrorState({ message, onRetry, title }: ErrorStateProps) {
  return (
    <AppCard compact>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-slate-950">{title}</strong>
          <p className="mt-1 text-sm text-slate-500">{message}</p>
        </div>
        {onRetry ? <Button icon="pi pi-refresh" label="Retry" onClick={onRetry} outlined /> : null}
      </div>
    </AppCard>
  );
}

export { ErrorState };
