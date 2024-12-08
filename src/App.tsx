import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import PrivateRoute from "@/components/auth/PrivateRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={<ErrorFallback />}
      beforeCapture={(scope) => {
        scope.setTag("location", window.location.href);
      }}
    >
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Sentry.ErrorBoundary>
  );
}

export default App;
