import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import { AppFooter } from "./AppFooter";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AppNetworkProgress } from "./AppNetworkProgress";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <>
      <AppNetworkProgress />
      <ConfirmDialog />
      <div className="min-h-screen bg-slate-100 font-sans text-slate-900 lg:flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen ? (
          <button
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
            onClick={closeSidebar}
            type="button"
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col transition-[margin,width] duration-300 ease-out">
          <main className="mx-auto min-w-0 w-full max-w-420 flex-1 px-4 py-5 sm:px-7">
            <Header
              onMenuClick={() => setIsSidebarOpen((current) => !current)}
            />
            <Outlet />
          </main>
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export { AppLayout };
