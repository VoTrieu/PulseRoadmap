import { ProgressSpinner } from "primereact/progressspinner";

function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <ProgressSpinner aria-label="Loading session" />
    </div>
  );
}

export { AuthLoadingScreen };
