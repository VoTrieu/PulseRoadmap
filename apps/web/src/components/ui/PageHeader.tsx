import { Button } from "primereact/button";
import type { ReactNode } from "react";

type PageHeaderProps = {
  action?: {
    disabled?: boolean;
    icon: string;
    label: string;
    loading?: boolean;
  };
  eyebrow: string;
  onAction?: () => void;
  subtitle?: ReactNode;
  title: string;
};

function PageHeader({
  action,
  eyebrow,
  onAction,
  subtitle,
  title,
}: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-teal-700">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? (
        <Button
          className="min-h-11 border-teal-700 bg-teal-700 px-4 font-bold shadow-lg shadow-teal-900/15"
          icon={action.loading ? "pi pi-spin pi-spinner" : action.icon}
          label={action.label}
          disabled={action.disabled}
          onClick={onAction}
        />
      ) : null}
    </section>
  );
}

export { PageHeader };
