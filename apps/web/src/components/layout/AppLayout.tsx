import type { ReactNode } from "react";
import { AppFooter } from "./AppFooter";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 lg:grid lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex min-w-0 flex-col">
        <main className="mx-auto min-w-0 w-full max-w-420 flex-1 px-4 py-5 sm:px-7">
          <Header />
          {children}
        </main>
        <AppFooter />
      </div>
    </div>
  );
}

export { AppLayout };
