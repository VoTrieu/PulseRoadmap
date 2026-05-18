import { Button } from "primereact/button";
import type { ReactNode } from "react";

type PageHeaderProps = {
  action?: {
    icon: string;
    label: string;
  };
  eyebrow: string;
  subtitle?: ReactNode;
  title: string;
};

function PageHeader({ action, eyebrow, subtitle, title }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-teal-700">{eyebrow}</p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subtitle}</p> : null}
      </div>
      {action ? (
        <Button
          className="min-h-11 gap-2 rounded-lg border-teal-700 bg-teal-700 px-4 font-bold shadow-lg shadow-teal-900/15 [&_.p-button-icon-left]:m-0"
          icon={action.icon}
          label={action.label}
        />
      ) : null}
    </section>
  );
}

export { PageHeader };
