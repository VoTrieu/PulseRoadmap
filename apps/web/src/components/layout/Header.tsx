import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const workspaces = [
  { name: "Acme Cloud", code: "acme" },
  { name: "Northstar Health", code: "northstar" },
  { name: "Atlas Cloud", code: "atlas" }
];

type Workspace = (typeof workspaces)[number];

function workspaceOptionTemplate(option: Workspace) {
  return <span className="block text-sm font-semibold text-slate-700">{option.name}</span>;
}

export function Header() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <header className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 
      shadow-sm md:flex-row md:items-center">
      <Dropdown
        className="min-h-11 w-full rounded-lg border-slate-300 shadow-none md:w-60 
        [&_.p-dropdown-label]:flex [&_.p-dropdown-label]:items-center [&_.p-dropdown-label]:py-2.5 
        [&_.p-dropdown-label]:font-semibold [&_.p-dropdown-label]:text-slate-700 
        [&_.p-dropdown-trigger]:text-slate-500"
        itemTemplate={workspaceOptionTemplate}
        optionLabel="name"
        options={workspaces}
        panelClassName="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-xl [&_.p-dropdown-item.p-focus]:!bg-slate-100 [&_.p-dropdown-item.p-highlight]:!bg-teal-50 [&_.p-dropdown-item.p-highlight]:!text-teal-900 [&_.p-dropdown-item]:rounded-md [&_.p-dropdown-item]:px-3 [&_.p-dropdown-item]:py-2.5 [&_.p-dropdown-item]:outline-none [&_.p-dropdown-item]:transition-colors [&_.p-dropdown-item]:hover:!bg-slate-100 [&_.p-dropdown-items]:p-0"
        value={selectedWorkspace}
        onChange={(e) => setSelectedWorkspace(e.value)}
      />

      <div className="flex min-h-11 min-w-64 flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
        <i className="pi pi-search shrink-0 text-base text-slate-500" aria-hidden="true" />
        <InputText
          className="w-full border-0! p-0! shadow-none! outline-none"
          placeholder="Search feedback, features, releases..."
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          aria-label="Notifications"
          className="h-11 w-11 text-slate-700 [&_.p-button-icon-left]:m-0"
          icon="pi pi-bell"
          text
          rounded
        />
        <Avatar label="TV" shape="circle" className="bg-slate-900 text-white" />
      </div>
    </header>
  );
}
