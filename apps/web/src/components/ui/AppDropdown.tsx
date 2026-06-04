import { Dropdown, type DropdownProps } from "primereact/dropdown";

type AppDropdownProps = DropdownProps;

const DEFAULT_PANEL_CLASS_NAME =
  "[&_.p-dropdown-item]:text-slate-700 [&_.p-dropdown-item.p-highlight]:bg-teal-700 [&_.p-dropdown-item.p-highlight]:text-white [&_.p-dropdown-item.p-highlight.p-focus]:bg-teal-700 [&_.p-dropdown-item.p-highlight.p-focus]:text-white";

function AppDropdown({
  className = "",
  panelClassName = "",
  ...props
}: AppDropdownProps) {
  return (
    <Dropdown
      className={`w-full ${className}`}
      panelClassName={`${DEFAULT_PANEL_CLASS_NAME} ${panelClassName}`}
      {...props}
    />
  );
}

export { AppDropdown };
