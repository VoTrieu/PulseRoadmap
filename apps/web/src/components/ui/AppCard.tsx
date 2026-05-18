import { Card } from "primereact/card";
import type { ReactNode } from "react";

type AppCardProps = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  subTitle?: ReactNode;
  title?: ReactNode;
};

function AppCard({ children, className = "", compact = false, subTitle, title }: AppCardProps) {
  const spacingClass = compact
    ? "[&_.p-card-body]:p-5 [&_.p-card-subtitle]:mb-4 [&_.p-card-title]:text-base"
    : "[&_.p-card-body]:p-[1.35rem] [&_.p-card-subtitle]:mb-5 [&_.p-card-title]:text-[1.05rem]";

  return (
    <Card
      className={`rounded-lg border border-slate-200 shadow-sm [&_.p-card-subtitle]:text-sm [&_.p-card-subtitle]:text-slate-500 [&_.p-card-title]:mb-1 [&_.p-card-title]:font-extrabold [&_.p-card-title]:text-slate-950 ${spacingClass} ${className}`}
      subTitle={subTitle}
      title={title}
    >
      {children}
    </Card>
  );
}

export { AppCard };
