import { ProgressSpinner } from "primereact/progressspinner";
import { AppCard } from "./AppCard";

type LoadingStateProps = {
  message: string;
};

function LoadingState({ message }: LoadingStateProps) {
  return (
    <AppCard compact>
      <div className="flex items-center gap-3 text-slate-600">
        <ProgressSpinner aria-label={message} className="h-8 w-8" strokeWidth="5" />
        <span>{message}</span>
      </div>
    </AppCard>
  );
}

export { LoadingState };
