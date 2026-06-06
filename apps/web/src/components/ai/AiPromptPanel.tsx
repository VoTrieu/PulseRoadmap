import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import type { AiPromptPreset } from "../../types/aiAssistant";
import { AppCard } from "../ui/AppCard";

type AiPromptPanelProps = {
  buttonLabel: string;
  isSubmitting: boolean;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  placeholder: string;
  presets: AiPromptPreset[];
  prompt: string;
  title: string;
};

function AiPromptPanel({
  buttonLabel,
  isSubmitting,
  onPromptChange,
  onSubmit,
  placeholder,
  presets,
  prompt,
  title,
}: AiPromptPanelProps) {
  return (
    <AppCard compact title={title}>
      <form action={onSubmit} className="grid gap-4">
        <InputTextarea
          autoResize
          className="w-full"
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder={placeholder}
          rows={5}
          value={prompt}
        />
        <div className="grid gap-3 md:grid-cols-3">
          {presets.map((preset) => (
            <button
              className="rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-teal-300 hover:bg-teal-50"
              key={preset.label}
              onClick={() => onPromptChange(preset.prompt)}
              type="button"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <i aria-hidden="true" className={preset.icon} />
                {preset.label}
              </span>
              <span className="mt-1 block text-sm leading-5 text-slate-500">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
        <Button
          disabled={isSubmitting}
          icon="pi pi-sparkles"
          label={buttonLabel}
          loading={isSubmitting}
          type="submit"
        />
      </form>
    </AppCard>
  );
}

export { AiPromptPanel };
