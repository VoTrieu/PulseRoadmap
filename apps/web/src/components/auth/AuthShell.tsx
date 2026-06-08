import type { ReactNode } from "react";
import { AppCard } from "../ui/AppCard";

type AuthShellProps = {
  children: ReactNode;
  subtitle: string;
  title: string;
};

function AuthShell({ children, subtitle, title }: AuthShellProps) {
  return (
    <main className="grid min-h-screen bg-slate-100 px-4 py-8 lg:grid-cols-[1fr_34rem]">
      <section className="hidden flex-col justify-between bg-teal-800 p-10 text-white lg:flex">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-teal-800">
              <i className="pi pi-circle-fill text-sm" aria-hidden="true" />
            </span>
            <div>
              <strong className="block text-xl">PulseRoadmap</strong>
              <span className="text-sm text-teal-100">Product operations</span>
            </div>
          </div>
          <div className="mt-20 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-100">
              B2B SaaS product operations
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight">
              Align feedback, roadmap, bugs, releases, and AI briefs.
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-6 text-teal-100">
          Built as an internal platform for product teams that need customer
          evidence, delivery planning, and release communication in one place.
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-xl items-center lg:max-w-none lg:bg-white lg:px-12">
        <AppCard className="w-full" title={title} subTitle={subtitle}>
          {children}
        </AppCard>
      </section>
    </main>
  );
}

export { AuthShell };
