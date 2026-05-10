import { useState, useEffect } from "react";
import { getCourses } from "../services/api";

function AdminCoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return (
    <div>
      <h2>All Courses List</h2>
      <p className="text-muted">Overview of all courses available on the platform.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {courses.length > 0 ? (
          courses.map(c => (
            <div className="card" key={c.id}>
              <h4>{c.title}</h4>
              <p className="text-muted">{c.level} Level | ₹{c.price}</p>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminCoursesList;
