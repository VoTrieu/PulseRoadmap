import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { isSupportedLocale, type Locale } from "../../i18n/i18n";
import type { AuthOrganization } from "../../types/auth";
import { AppDropdown } from "../ui/AppDropdown";

const localeOptions: { label: string; value: Locale }[] = [
  { label: "EN", value: "en" },
  { label: "FR", value: "fr" },
];

function organizationOptionTemplate(option: AuthOrganization) {
  return (
    <span className="block text-sm font-semibold text-slate-700">
      {option.name}
    </span>
  );
}

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { currentUser, logoutUser } = useAuth();
  const { i18n, t } = useTranslation();
  const locale = isSupportedLocale(i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : "en";
  const initials = getInitials(currentUser?.fullName ?? currentUser?.email ?? "User");
  const organizations = currentUser?.organizations ?? [];
  const selectedOrganization = organizations[0] ?? null;

  return (
    <header className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center">
      <Button
        aria-label={t("layout.toggleNavigation")}
        className="h-11 w-11 text-slate-700"
        icon="pi pi-bars"
        onClick={onMenuClick}
        text
        rounded
      />

      <AppDropdown
        className="h-11 md:w-60"
        disabled={organizations.length <= 1}
        itemTemplate={organizationOptionTemplate}
        optionLabel="name"
        options={organizations}
        placeholder={t("header.noWorkspace")}
        value={selectedOrganization}
      />

      <div className="flex h-11 min-w-64 flex-1 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
        <i
          className="pi pi-search shrink-0 text-base text-slate-500"
          aria-hidden="true"
        />
        <InputText
          className="h-full w-full border-none p-0 shadow-none"
          placeholder={t("header.searchPlaceholder")}
        />
      </div>

      <div className="flex items-center gap-3">
        <AppDropdown
          aria-label={t("language.label")}
          className="h-11 w-24!"
          optionLabel="label"
          optionValue="value"
          options={localeOptions}
          value={locale}
          onChange={(event) => void i18n.changeLanguage(event.value)}
        />
        <Button
          aria-label={t("header.notifications")}
          className="h-11 w-11 text-slate-700"
          icon="pi pi-bell"
          text
          rounded
        />
        <Avatar label={initials} shape="circle" className="bg-slate-900 text-white" />
        <Button
          aria-label={t("auth.logout")}
          className="h-11 w-11 text-slate-700"
          icon="pi pi-sign-out"
          onClick={logoutUser}
          text
          rounded
        />
      </div>
    </header>
  );
}

function getInitials(value: string): string {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
}
