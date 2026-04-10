import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <Link className="brand-link" to="/">
        <span className="brand-badge">DP</span>
        <div>
          <p className="brand-name">DataPulse</p>
          <p className="brand-copy">Frontend auth and protected access</p>
        </div>
      </Link>

      <nav className="nav-links">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </nav>

      <div className="user-panel">
        <div>
          <p className="user-name">{user?.name}</p>
          <p className="user-role">{user?.role}</p>
        </div>
        <button className="ghost-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
