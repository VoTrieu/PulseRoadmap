type AppPage = "dashboard" | "feedback";

type NavItem = {
  id: AppPage;
  path: string;
  label: string;
  icon: string;
};

export type { AppPage, NavItem };
