import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";

function App() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}

export { App };
