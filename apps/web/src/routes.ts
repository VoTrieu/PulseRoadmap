import type { NavItem } from "./types/navigation";

const appRoutes = {
  dashboard: "/",
  feedback: "/feedback",
  roadmap: "/roadmap",
  bugs: "/bugs",
  releases: "/releases",
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
];

export { appRoutes, navItems };
