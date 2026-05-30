import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
  title: string;
};

function ErrorState({ message, onRetry, title }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-slate-950">{title}</strong>
          <p className="mt-1 text-sm text-slate-500">{message}</p>
        </div>
        {onRetry ? <Button icon="pi pi-refresh" label={t("common.retry")} onClick={onRetry} outlined /> : null}
      </div>
    </div>
  );
}

export { ErrorState };
