import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../../components/auth/AuthShell";
import { ErrorState } from "../../components/ui/ErrorState";
import { useAuth } from "../../context/AuthContext";
import { appRoutes } from "../../routes";
import { getErrorMessage } from "../../services/apiError";

type AuthFormState = {
  error: string | null;
};

const initialState: AuthFormState = {
  error: null,
};

function RegisterPage() {
  const { t } = useTranslation();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (_previousState: AuthFormState, formData: FormData) => {
      try {
        await registerUser({
          email: String(formData.get("email") ?? ""),
          full_name: String(formData.get("fullName") ?? ""),
          organization_name: String(formData.get("organizationName") ?? ""),
          password: String(formData.get("password") ?? ""),
        });
        navigate(appRoutes.dashboard, { replace: true });

        return initialState;
      } catch (error) {
        return { error: getErrorMessage(error) };
      }
    },
    initialState,
  );

  return (
    <AuthShell
      subtitle={t("auth.register.subtitle")}
      title={t("auth.register.title")}
    >
      <form action={formAction} className="space-y-5">
        {state.error ? (
          <ErrorState
            message={state.error}
            title={t("auth.register.errorTitle")}
          />
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            {t("auth.fullName")}
          </span>
          <InputText
            autoComplete="name"
            className="w-full"
            name="fullName"
            placeholder={t("auth.fullNamePlaceholder")}
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            {t("auth.organization")}
          </span>
          <InputText
            autoComplete="organization"
            className="w-full"
            name="organizationName"
            placeholder={t("auth.organizationPlaceholder")}
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            {t("auth.email")}
          </span>
          <InputText
            autoComplete="email"
            className="w-full"
            name="email"
            placeholder={t("auth.emailPlaceholder")}
            required
            type="email"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            {t("auth.password")}
          </span>
          <Password
            autoComplete="new-password"
            className="w-full"
            inputClassName="w-full"
            name="password"
            promptLabel={t("auth.passwordPrompt")}
            required
            toggleMask
          />
        </label>

        <Button
          className="w-full"
          icon="pi pi-user-plus"
          label={isPending ? t("auth.creatingAccount") : t("auth.createAccount")}
          loading={isPending}
          type="submit"
        />

        <p className="text-center text-sm text-slate-600">
          {t("auth.hasAccount")}{" "}
          <Link className="font-semibold text-teal-700" to={appRoutes.login}>
            {t("auth.signIn")}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export { RegisterPage };
