import { useState, useEffect } from "react";
import { getNews, addNews } from "../services/api";
import Toast from "../components/Toast";

function ManageNews() {
  // State for the list of news articles
  const [news, setNews] = useState([]);
  
  // State for the new news article form
  const [form, setForm] = useState({ title: "", description: "" });
  
  // State to manage toast notifications
  const [toast, setToast] = useState("");

  // Load news on component mount
  useEffect(() => {
    setNews(getNews());
  }, []);

  // Function to add a news article
  const handleAdd = () => {
    if (!form.title || !form.description) {
      setToast("Please fill out all fields.");
      return;
    }

    const item = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split("T")[0] // Add current date
    };

    addNews(item);
    setNews([item, ...news]); // Prepend to show newest first
    setToast("News Article Published!");
    setForm({ title: "", description: "" }); // Reset form
  };

  return (
    <div>
      <h3>Publish Market Update</h3>
      <p className="text-muted">Post daily news updates to the platform.</p>

      {/* Form for adding news */}
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="form-group">
          <label>News Title</label>
          <input 
            placeholder="e.g., Sensex Reaches New High" 
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} 
          />
        </div>
        
        <div className="form-group">
          <label>News Content</label>
          <textarea 
            placeholder="Write the news description here..." 
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} 
          />
        </div>

        <button onClick={handleAdd} style={{ width: '100%', marginTop: '10px' }}>
          Publish News
        </button>
      </div>

      <h3 style={{ marginTop: '30px' }}>Recent News Updates</h3>

      {/* Render existing news items */}
      <div style={{ display: 'grid', gap: '15px', maxWidth: '800px' }}>
        {news.map(n => (
          <div className="card" key={n.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0, color: 'var(--primary)' }}>{n.title}</h4>
              <small className="text-muted">{n.date}</small>
            </div>
            <p style={{ marginTop: '10px' }}>{n.description}</p>
          </div>
        ))}
      </div>

      {/* Toast Notification Component */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export default ManageNews;