import type { NavItem } from "./types/navigation";

const appRoutes = {
  dashboard: "/",
  feedback: "/feedback"
} as const;

const navItems: NavItem[] = [
  { id: "dashboard", path: appRoutes.dashboard, label: "Dashboard", icon: "pi pi-th-large" },
  { id: "feedback", path: appRoutes.feedback, label: "Feedback", icon: "pi pi-inbox" }
];

export { appRoutes, navItems };
