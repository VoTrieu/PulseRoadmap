import { Button } from "primereact/button";
import type { ButtonProps } from "primereact/button";
import type { ReactNode } from "react";

type PageHeaderAction = {
  disabled?: boolean;
  icon: string;
  label: string;
  loading?: boolean;
  onClick?: () => void;
  outlined?: boolean;
  severity?: ButtonProps["severity"];
};

type PageHeaderProps = {
  action?: PageHeaderAction;
  actions?: PageHeaderAction[];
  eyebrow: string;
  onAction?: () => void;
  subtitle?: ReactNode;
  title: string;
};

function PageHeader({
  action,
  actions,
  eyebrow,
  onAction,
  subtitle,
  title,
}: PageHeaderProps) {
  const headerActions = actions ?? (action ? [{ ...action, onClick: action.onClick ?? onAction }] : []);

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
      {headerActions.length ? (
        <div className="flex flex-wrap gap-2">
          {headerActions.map((headerAction) => (
            <Button
              className={
                headerAction.severity
                  ? "min-h-11 px-4 font-bold"
                  : "min-h-11 border-teal-700 bg-teal-700 px-4 font-bold shadow-lg shadow-teal-900/15"
              }
              disabled={headerAction.disabled}
              icon={headerAction.loading ? "pi pi-spin pi-spinner" : headerAction.icon}
              key={headerAction.label}
              label={headerAction.label}
              onClick={headerAction.onClick}
              outlined={headerAction.outlined}
              severity={headerAction.severity}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export { PageHeader };
