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

type AiAssistantContext = {
  aiProvider: string;
  totalFeedback: number;
  totalRoadmap: number;
  totalBugs: number;
  totalReleases: number;
  highUrgencyFeedback: number;
  highPriorityRoadmap: number;
  criticalBugs: number;
  publicReleases: number;
  topFeedbackArea: string | null;
  nextRelease: string | null;
};

type AiAssistantContextApiResponse = {
  ai_provider: string;
  total_feedback: number;
  total_roadmap: number;
  total_bugs: number;
  total_releases: number;
  high_urgency_feedback: number;
  high_priority_roadmap: number;
  critical_bugs: number;
  public_releases: number;
  top_feedback_area: string | null;
  next_release: string | null;
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
  AiAssistantContext,
  AiAssistantContextApiResponse,
  AiBrief,
  AiBriefRequest,
  AiBriefSection,
  AiContextItem,
  AiLocale,
  AiPromptPreset,
};
