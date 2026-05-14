import { useState, useEffect } from "react";
import { getCourses, getAllModules, deleteModule } from "../services/api";
import Toast from "../components/Toast";

function ViewDeleteModules() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [toast, setToast] = useState("");

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setCourses(getCourses());
    setModules(getAllModules());
  };

  const handleDelete = (moduleId) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      deleteModule(moduleId);
      setToast("Module deleted successfully.");
      fetchData(); // Refresh the list
    }
  };

  return (
    <div>
      <h3>View & Delete Modules</h3>
      <p className="text-muted">Manage existing modules organized by course.</p>

      <div style={{ marginTop: '20px' }}>
        {courses.map(course => {
          // Filter modules that belong to the current course
          const courseModules = modules.filter(m => m.courseId === course.id);

          return (
            <div key={course.id} className="card" style={{ marginBottom: '20px', padding: '20px' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                Course: {course.title}
              </h4>
              
              {courseModules.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {courseModules.map((module, index) => (
                    <li 
                      key={module.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                    >
                      <div>
                        <strong>{index + 1}. {module.title}</strong>
                        <span className="text-muted" style={{ marginLeft: '10px', fontSize: '0.9em' }}>
                          ({module.isFree ? 'Free' : 'Premium'})
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDelete(module.id)}
                        style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '5px 10px', fontSize: '0.9rem' }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted" style={{ fontStyle: 'italic' }}>No modules found for this course.</p>
              )}
            </div>
          );
        })}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export default ViewDeleteModules;
