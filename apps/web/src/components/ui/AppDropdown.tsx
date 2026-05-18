import { Dropdown, type DropdownProps } from "primereact/dropdown";

type AppDropdownProps = DropdownProps;

const dropdownClassName =
  "min-h-11 rounded-lg border-slate-300 shadow-none [&_.p-dropdown-label]:flex [&_.p-dropdown-label]:items-center [&_.p-dropdown-label]:py-2.5 [&_.p-dropdown-label]:font-semibold [&_.p-dropdown-label]:text-slate-700 [&_.p-dropdown-trigger]:text-slate-500";

const dropdownPanelClassName =
  "mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-xl [&_.p-dropdown-item.p-focus]:!bg-slate-100 [&_.p-dropdown-item.p-highlight]:!bg-teal-50 [&_.p-dropdown-item.p-highlight]:!text-teal-900 [&_.p-dropdown-item]:rounded-md [&_.p-dropdown-item]:px-3 [&_.p-dropdown-item]:py-2.5 [&_.p-dropdown-item]:text-sm [&_.p-dropdown-item]:font-semibold [&_.p-dropdown-item]:text-slate-700 [&_.p-dropdown-item]:outline-none [&_.p-dropdown-item]:transition-colors [&_.p-dropdown-item]:hover:!bg-slate-100 [&_.p-dropdown-items]:p-0";

function AppDropdown({ className = "", panelClassName = "", ...props }: AppDropdownProps) {
  return (
    <Dropdown
      className={`${dropdownClassName} ${className}`}
      panelClassName={`${dropdownPanelClassName} ${panelClassName}`}
      {...props}
    />
  );
}

export { AppDropdown };
