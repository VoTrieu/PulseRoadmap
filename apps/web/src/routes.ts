import type { NavItem } from "./types/navigation";

const appRoutes = {
  dashboard: "/",
  feedback: "/feedback",
  roadmap: "/roadmap",
  bugs: "/bugs",
  releases: "/releases",
  analytics: "/analytics",
  aiAssistant: "/ai-assistant",
} as const;

const navItems: NavItem[] = [
  {
    id: "dashboard",
    path: appRoutes.dashboard,
    labelKey: "nav.dashboard",
    icon: "pi pi-th-large",
  },
  {
    id: "feedback",
    path: appRoutes.feedback,
    labelKey: "nav.feedback",
    icon: "pi pi-inbox",
  },
  {
    id: "roadmap",
    path: appRoutes.roadmap,
    labelKey: "nav.roadmap",
    icon: "pi pi-sitemap",
  },
  {
    id: "bugs",
    path: appRoutes.bugs,
    labelKey: "nav.bugs",
    icon: "pi pi-exclamation-triangle",
  },
  {
    id: "releases",
    path: appRoutes.releases,
    labelKey: "nav.releases",
    icon: "pi pi-send",
  },
  {
    id: "analytics",
    path: appRoutes.analytics,
    labelKey: "nav.analytics",
    icon: "pi pi-chart-line",
  },
  {
    id: "aiAssistant",
    path: appRoutes.aiAssistant,
    labelKey: "nav.aiAssistant",
    icon: "pi pi-sparkles",
  },
];

export { appRoutes, navItems };
