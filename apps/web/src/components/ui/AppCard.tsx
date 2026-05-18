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
  return (
    <Card
      className={`border border-slate-200 shadow-sm ${compact ? "text-sm" : ""} ${className}`}
      subTitle={subTitle}
      title={title}
    >
      {children}
    </Card>
  );
}

export { AppCard };
