import type { NavItem } from "./types/navigation";

const appRoutes = {
  dashboard: "/",
  feedback: "/feedback",
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
];

export { appRoutes, navItems };
