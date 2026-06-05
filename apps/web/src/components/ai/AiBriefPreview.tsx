import type { AiBrief } from "../../types/aiAssistant";
import { AppCard } from "../ui/AppCard";

type AiBriefPreviewProps = {
  brief: AiBrief;
  emptyMessage: string;
  subTitle: string;
  title: string;
};

function AiBriefPreview({ brief, emptyMessage, subTitle, title }: AiBriefPreviewProps) {
  return (
    <AppCard compact subTitle={subTitle} title={title}>
      {brief.sections.length === 0 ? (
        <p className="text-sm leading-6 text-slate-500">{emptyMessage}</p>
      ) : (
        <article className="grid gap-5">
          <h2 className="text-xl font-bold text-slate-950">{brief.title}</h2>
          {brief.sections.map((section) => (
            <section className="grid gap-2" key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-teal-700">
                {section.title}
              </h3>
              <p className="leading-7 text-slate-700">{section.body}</p>
            </section>
          ))}
        </article>
      )}
    </AppCard>
  );
}

export { AiBriefPreview };
