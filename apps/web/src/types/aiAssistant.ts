import type { SummaryItem } from "./summary";

type AiAssistantMetric = SummaryItem;

type AiBriefSection = {
  title: string;
  body: string;
};

type AiBrief = {
  sections: AiBriefSection[];
  title: string;
};

type AiLocale = "en" | "fr";

type AiBriefRequest = {
  locale: AiLocale;
  prompt: string;
};

type AiPromptPreset = {
  description: string;
  icon: string;
  label: string;
  prompt: string;
};

type AiContextItem = {
  label: string;
  value: string;
};

export type {
  AiAssistantMetric,
  AiBrief,
  AiBriefRequest,
  AiBriefSection,
  AiContextItem,
  AiLocale,
  AiPromptPreset,
};
