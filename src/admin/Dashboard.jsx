import ManageCourses from "./ManageCourses";

function Dashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p className="text-muted">Manage your platform's content here.</p>

      <div style={{ marginTop: '20px' }}>
        <ManageCourses />
      </div>
    </div>
  );
}

export default Dashboard;