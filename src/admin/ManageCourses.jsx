import { useState, useEffect } from "react";
import { getCourses, addCourse } from "../services/api";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

function ManageCourses() {
  // State for the list of courses
  const [courses, setCourses] = useState([]);
  
  // State for the new course form
  const [form, setForm] = useState({ title: "", level: "Beginner", price: 0 });

  // State to handle which course is currently being edited (null if none)
  const [editing, setEditing] = useState(null);
  
  // State to manage toast notifications
  const [toast, setToast] = useState("");

  // Load courses on component mount
  useEffect(() => {
    setCourses(getCourses());
  }, []);

  // Function to add a new course
  const handleAdd = () => {
    if (!form.title) {
      setToast("Please enter a title");
      return;
    }
    
    const newCourse = { id: Date.now(), ...form };
    addCourse(newCourse);
    setCourses([...courses, newCourse]); // Update local state so UI refreshes
    setToast("Course Added Successfully!");
  };

  // Function to delete a course
  const handleDelete = (id) => {
    const updated = courses.filter(c => c.id !== id);
    // Directly update local storage for simplicity in this demo app
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
    setToast("Course Deleted!");
  };

  // Function to save edits to an existing course
  const handleUpdate = () => {
    const updated = courses.map(c =>
      c.id === editing.id ? editing : c
    );
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
    setEditing(null); // Close the modal
    setToast("Course Updated!");
  };

  return (
    <div>
      <h3>Add New Course</h3>

      {/* Form for adding a course */}
      <div className="filter-bar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '10px' }}>
        <input 
          placeholder="Course Title" 
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} 
        />
        <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
          <option value="Beginner">Beginner</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input 
          type="number" 
          placeholder="Price (₹)"
          value={form.price || ''}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })} 
        />
        <button onClick={handleAdd}>Add Course</button>
      </div>

      <h3 style={{ marginTop: '30px' }}>Existing Courses</h3>
      
      {/* List of existing courses */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {courses.map(c => (
          <div className="card" key={c.id}>
            <h4>{c.title}</h4>
            <p className="text-muted">{c.level} Level | ₹{c.price}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => setEditing(c)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal Component */}
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <h3>Edit Course</h3>
          <div className="form-group">
            <label>Title</label>
            <input 
              value={editing.title} 
              onChange={e => setEditing({ ...editing, title: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input 
              type="number"
              value={editing.price} 
              onChange={e => setEditing({ ...editing, price: Number(e.target.value) })} 
            />
          </div>
          <button onClick={handleUpdate} style={{ width: '100%' }}>Save Changes</button>
        </Modal>
      )}

      {/* Toast Notification Component */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export default ManageCourses;