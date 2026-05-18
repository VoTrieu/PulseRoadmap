import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { AppDropdown } from "../ui/AppDropdown";

const workspaces = [
  { name: "Acme Cloud", code: "acme" },
  { name: "Northstar Health", code: "northstar" },
  { name: "Atlas Cloud", code: "atlas" }
];

type Workspace = (typeof workspaces)[number];

function workspaceOptionTemplate(option: Workspace) {
  return <span className="block text-sm font-semibold text-slate-700">{option.name}</span>;
}

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <header className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 
      shadow-sm md:flex-row md:items-center">
      <Button
        aria-label="Toggle navigation"
        className="h-11 w-11 text-slate-700 [&_.p-button-icon-left]:m-0"
        icon="pi pi-bars"
        onClick={onMenuClick}
        text
        rounded
      />

      <AppDropdown
        className="w-full md:w-60"
        itemTemplate={workspaceOptionTemplate}
        optionLabel="name"
        options={workspaces}
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
