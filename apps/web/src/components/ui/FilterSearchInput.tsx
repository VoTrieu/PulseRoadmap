import { InputText } from "primereact/inputtext";

type FilterSearchInputProps = {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

function FilterSearchInput({
  onChange,
  placeholder,
  value,
}: FilterSearchInputProps) {
  return (
    <div className="flex min-h-11 min-w-64 flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
      <i
        aria-hidden="true"
        className="pi pi-search shrink-0 text-base text-slate-500"
      />
      <InputText
        className="w-full border-none p-0 shadow-none"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export { FilterSearchInput };
