import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { navItems } from "../../routes";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-70 overflow-hidden border-r border-slate-200 bg-white py-6 transition-[transform,width,padding,opacity] duration-300 ease-out lg:static lg:z-auto lg:min-h-screen lg:shrink-0 ${
        isOpen
          ? "translate-x-0 px-5 opacity-100 shadow-2xl shadow-slate-950/20 lg:w-70 lg:shadow-none"
          : "-translate-x-full px-5 opacity-100 lg:w-0 lg:translate-x-0 lg:border-r-0 lg:px-0 lg:opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`w-60 transition-opacity duration-200 ${
          isOpen ? "opacity-100 delay-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mb-9 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-700 text-white shadow-sm shadow-teal-900/20">
              <i className="pi pi-circle-fill text-xs" />
            </div>
            <div>
              <strong className="block text-lg text-slate-950">PulseRoadmap</strong>
              <span className="text-sm text-slate-500">Product operations</span>
            </div>
          </div>
          <Button
            aria-label="Close navigation"
            className="h-9 w-9 text-slate-500 [&_.p-button-icon-left]:m-0 lg:hidden"
            icon="pi pi-times"
            onClick={onClose}
            text
            rounded
          />
        </div>

        <nav className="grid gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.id} to={item.path}>
              {({ isActive }) => (
                <Button
                  className={`min-h-12 w-full justify-start gap-3 rounded-lg border-0 px-4 py-3 text-left font-bold shadow-none [&_.p-button-icon-left]:m-0 [&_.p-button-label]:flex-none [&_.p-button-label]:text-base ${
                    isActive ? "bg-teal-50 text-teal-950" : "bg-transparent text-slate-600 hover:bg-slate-100"
                  }`}
                  icon={item.icon}
                  label={item.label}
                  text
                />
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export { Sidebar };
