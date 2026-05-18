import { Button } from "primereact/button";

const navItems = [
  { label: "Dashboard", icon: "pi pi-th-large", active: true },
  { label: "Feedback", icon: "pi pi-inbox" },
  { label: "Roadmap", icon: "pi pi-sitemap" },
  { label: "Bugs", icon: "pi pi-exclamation-triangle" },
  { label: "Releases", icon: "pi pi-send" },
  { label: "Analytics", icon: "pi pi-chart-line" },
  { label: "AI Assistant", icon: "pi pi-sparkles" }
];

function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white px-5 py-6 lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="mb-9 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-700 text-white shadow-sm shadow-teal-900/20">
          <i className="pi pi-circle-fill text-xs" />
        </div>
        <div>
          <strong className="block text-lg text-slate-950">PulseRoadmap</strong>
          <span className="text-sm text-slate-500">Product operations</span>
        </div>
      </div>

      <nav className="grid gap-1 md:grid-cols-3 lg:grid-cols-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <Button
            className={`min-h-12 justify-start gap-3 rounded-lg border-0 px-4 py-3 text-left font-bold shadow-none [&_.p-button-icon-left]:m-0 [&_.p-button-label]:flex-none [&_.p-button-label]:text-base ${
              item.active ? "bg-teal-50 text-teal-950" : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
            icon={item.icon}
            key={item.label}
            label={item.label}
            text
          />
        ))}
      </nav>
    </aside>
  );
}

export { Sidebar };
