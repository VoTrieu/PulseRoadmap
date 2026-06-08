import { useActionState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

function LoginPage() {
  const { t } = useTranslation();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = getRedirectPath(location.state);

  const [state, formAction, isPending] = useActionState(
    async (_previousState: AuthFormState, formData: FormData) => {
      try {
        await loginUser({
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
        });
        navigate(redirectTo, { replace: true });

        return initialState;
      } catch (error) {
        return { error: getErrorMessage(error) };
      }
    },
    initialState,
  );

  return (
    <AuthShell subtitle={t("auth.login.subtitle")} title={t("auth.login.title")}>
      <form action={formAction} className="space-y-5">
        {state.error ? (
          <ErrorState message={state.error} title={t("auth.login.errorTitle")} />
        ) : null}

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
            autoComplete="current-password"
            className="w-full"
            feedback={false}
            inputClassName="w-full"
            name="password"
            required
            toggleMask
          />
        </label>

        <Button
          className="w-full"
          icon="pi pi-sign-in"
          label={isPending ? t("auth.signingIn") : t("auth.signIn")}
          loading={isPending}
          type="submit"
        />

        <p className="text-center text-sm text-slate-600">
          {t("auth.noAccount")}{" "}
          <Link className="font-semibold text-teal-700" to={appRoutes.register}>
            {t("auth.createAccount")}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

function getRedirectPath(state: unknown): string {
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "object" &&
    state.from !== null &&
    "pathname" in state.from &&
    typeof state.from.pathname === "string"
  ) {
    return state.from.pathname;
  }

  return appRoutes.dashboard;
}

export { LoginPage };
