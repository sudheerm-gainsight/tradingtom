import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Admin Panel</h3>
        <ul style={{ flex: 1 }}>
          <li>Dashboard</li>
          <li>Courses</li>
          <li>Modules</li>
        </ul>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} style={{ width: '100%' }}>Logout</button>
        </div>
      </aside>

      <main className="admin-content" style={{ flex: 1, backgroundColor: 'var(--bg-main)' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;