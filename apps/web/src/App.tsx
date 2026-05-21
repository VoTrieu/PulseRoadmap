import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { FeedbackPage } from "./pages/Feedback/FeedbackPage";
import { FeedbackDetailPage } from "./pages/Feedback/FeedbackDetailPage";
import { appRoutes } from "./routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={appRoutes.feedback} element={<FeedbackPage />} />
          <Route path="/feedback/:feedbackId" element={<FeedbackDetailPage />} />
          <Route path="*" element={<Navigate replace to={appRoutes.dashboard} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { App };
