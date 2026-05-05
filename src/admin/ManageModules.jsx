import { useState } from "react";
import { getCourses, addModule } from "../services/api";
import Toast from "../components/Toast";

function ManageModules() {
  // Get courses so we can populate the dropdown select menu
  const courses = getCourses();
  
  // State to manage toast notifications
  const [toast, setToast] = useState("");

  // State for the new module form
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    isFree: true,
    video: ""
  });

  // Function to save the new module
  const handleAdd = () => {
    // Basic validation
    if (!form.courseId || !form.title) {
      setToast("Please select a course and enter a title.");
      return;
    }

    addModule({
      id: Date.now(),
      courseId: Number(form.courseId),
      title: form.title,
      isFree: form.isFree,
      video: form.video
    });

    setToast("Module Added Successfully!");
    
    // Clear form after adding
    setForm({ ...form, title: "", video: "" });
  };

  return (
    <div>
      <h3>Add New Module to Course</h3>
      <p className="text-muted">Modules contain the actual video lessons for a course.</p>

      <div className="card" style={{ maxWidth: '600px' }}>
        {/* COURSE SELECT DROPDOWN */}
        <div className="form-group">
          <label>Select Course</label>
          <select 
            value={form.courseId} 
            onChange={e => setForm({ ...form, courseId: e.target.value })}
          >
            <option value="">-- Choose a Course --</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Module Title</label>
          <input 
            placeholder="e.g., Intro to Candlesticks" 
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label>YouTube Embed URL</label>
          <input 
            placeholder="https://www.youtube.com/embed/..." 
            value={form.video}
            onChange={e => setForm({ ...form, video: e.target.value })} 
          />
        </div>

        {/* CHECKBOX: Determine if module is locked behind payment */}
        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={form.isFree}
              onChange={e => setForm({ ...form, isFree: e.target.checked })} 
            />
            Make this a Free Preview (unlocked for everyone)
          </label>
        </div>

        <button onClick={handleAdd} style={{ width: '100%', marginTop: '10px' }}>
          Add Module
        </button>
      </div>

      {/* Toast Notification Component */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export default ManageModules;