import type { TranslationKey } from "../i18n/translations";

type AppPage =
  | "dashboard"
  | "feedback"
  | "roadmap"
  | "bugs"
  | "releases"
  | "analytics"
  | "aiAssistant";

type NavItem = {
  id: AppPage;
  path: string;
  labelKey: TranslationKey;
  icon: string;
};

export type { AppPage, NavItem };
