import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { authReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return (
      <main className="page-shell">
        <div className="state-card">
          <div className="spinner" />
          <p>Checking your session...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
