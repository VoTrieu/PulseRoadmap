import { Dropdown, type DropdownProps } from "primereact/dropdown";

type AppDropdownProps = DropdownProps;

function AppDropdown({ className = "", panelClassName = "", ...props }: AppDropdownProps) {
  return (
    <Dropdown
      className={`w-full ${className}`}
      panelClassName={panelClassName}
      {...props}
    />
  );
}

export { AppDropdown };
