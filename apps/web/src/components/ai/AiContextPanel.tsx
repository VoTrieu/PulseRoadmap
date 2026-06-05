import type { AiContextItem } from "../../types/aiAssistant";
import { AppCard } from "../ui/AppCard";

type AiContextPanelProps = {
  items: AiContextItem[];
  subTitle: string;
  title: string;
};

function AiContextPanel({ items, subTitle, title }: AiContextPanelProps) {
  return (
    <AppCard compact subTitle={subTitle} title={title}>
      <dl className="grid gap-3">
        {items.map((item) => (
          <div
            className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
            key={item.label}
          >
            <dt className="text-sm text-slate-500">{item.label}</dt>
            <dd className="text-right text-sm font-bold text-slate-900">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </AppCard>
  );
}

export { AiContextPanel };
