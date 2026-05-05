import { useState } from "react";
import ManageCourses from "./ManageCourses";
import ManageModules from "./ManageModules";

function Dashboard() {
  // State to track which tab is currently active in the admin panel
  const [tab, setTab] = useState("courses");

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p className="text-muted">Manage your platform's content here.</p>

      {/* Admin Tabs Navigation */}
      <div className="admin-tabs" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
        <button 
          onClick={() => setTab("courses")}
          style={{ background: tab === 'courses' ? 'var(--primary)' : 'var(--bg-card)', color: tab === 'courses' ? '#000' : 'var(--text-main)' }}
        >
          Courses
        </button>
        <button 
          onClick={() => setTab("modules")}
          style={{ background: tab === 'modules' ? 'var(--primary)' : 'var(--bg-card)', color: tab === 'modules' ? '#000' : 'var(--text-main)' }}
        >
          Modules
        </button>
      </div>

      {/* Render the appropriate component based on the active tab */}
      <div style={{ marginTop: '20px' }}>
        {tab === "courses" && <ManageCourses />}
        {tab === "modules" && <ManageModules />}
      </div>
    </div>
  );
}

export default Dashboard;