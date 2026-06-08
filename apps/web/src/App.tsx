import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicOnlyRoute } from "./components/auth/PublicOnlyRoute";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { FeedbackPage } from "./pages/Feedback/FeedbackPage";
import { FeedbackDetailPage } from "./pages/Feedback/FeedbackDetailPage";
import { RoadmapPage } from "./pages/Roadmap/RoadmapPage";
import { BugsPage } from "./pages/Bugs/BugsPage";
import { ReleasesPage } from "./pages/Releases/ReleasesPage";
import { AnalyticsPage } from "./pages/Analytics/AnalyticsPage";
import { AiAssistantPage } from "./pages/AiAssistant/AiAssistantPage";
import { appRoutes } from "./routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path={appRoutes.login} element={<LoginPage />} />
          <Route path={appRoutes.register} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path={appRoutes.feedback} element={<FeedbackPage />} />
            <Route path="/feedback/:feedbackId" element={<FeedbackDetailPage />} />
            <Route path={appRoutes.roadmap} element={<RoadmapPage />} />
            <Route path={appRoutes.bugs} element={<BugsPage />} />
            <Route path={appRoutes.releases} element={<ReleasesPage />} />
            <Route path={appRoutes.analytics} element={<AnalyticsPage />} />
            <Route path={appRoutes.aiAssistant} element={<AiAssistantPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate replace to={appRoutes.dashboard} />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
