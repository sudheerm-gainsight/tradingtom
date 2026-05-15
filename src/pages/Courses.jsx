import { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import { useNavigate } from "react-router-dom";

function Courses() {
  // Local state to hold the list of courses fetched from the API
  const [courses, setCourses] = useState([]);

  // Local state for all our filters
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [cheapOnly, setCheapOnly] = useState(false);

  const navigate = useNavigate();

  // useEffect runs once when the component mounts to fetch courses
  useEffect(() => {
    setCourses(getCourses());
  }, []);

  // Compute the filtered courses dynamically before rendering
  // This means the list updates instantly when a filter changes
  const filtered = courses.filter(c => {
    return (
      c.title.toLowerCase().includes(search.toLowerCase()) && // Search filter
      (level === "All" || c.level === level) &&             // Dropdown filter
      (!cheapOnly || c.price <= 500)                        // Checkbox filter
    );
  });

  return (
    <div>
      <h2>Explore Courses</h2>

      {/* The filter-bar class aligns the search, dropdown, and checkbox horizontally */}
      <div className="filter-bar">
        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* DROPDOWN FILTER */}
        <select className="level-filter" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* CHECKBOX FILTER */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={cheapOnly}
            onChange={(e) => setCheapOnly(e.target.checked)}
          />
          Under ₹500
        </label>
      </div>

      {/* DYNAMIC LIST RENDERING */}
      {filtered.length > 0 ? (
        filtered.map(c => (
          <div key={c.id} className="card">
            <h3>{c.title}</h3>
            <p className="text-muted">{c.level} Level | ₹{c.price}</p>
            {/* Programmatically navigate to the course details page */}
            <button onClick={() => navigate(`/course/${c.id}`)}>View Course</button>
          </div>
        ))
      ) : (
        <p>No courses found matching your criteria.</p>
      )}
    </div>
  );
}

export default Courses;