import { useParams, useNavigate } from "react-router-dom";
import { getModulesByCourse, hasPurchased } from "../services/api";
import { useAuth } from "../context/AuthContext";

function CourseDetail() {
  // useParams gets the dynamic :id from the URL (e.g., /course/1 -> id: "1")
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch the modules belonging to this specific course
  const modules = getModulesByCourse(Number(id));
  
  // Check if the current user has purchased this course
  // If no user is logged in, it safely falls back to false
  const purchased = user ? hasPurchased(user.id, Number(id)) : false;

  // Helper function to convert standard YouTube links into iframe embed links
  const getEmbedUrl = (url) => {
    if (!url) return "";
    
    // If it is already an embed link, return it as is
    if (url.includes("youtube.com/embed/")) return url;
    
    let videoId = "";
    
    // Handle short links (youtu.be/ID)
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } 
    // Handle standard links (youtube.com/watch?v=ID)
    else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    }
    
    // Return formatted embed URL, or original if not recognized
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>Course Modules</h2>
          <p className="text-muted">Start learning with our comprehensive modules.</p>
        </div>
        <button onClick={() => navigate(`/course/${id}/about`)} style={{ padding: '8px 16px', background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
          About Course
        </button>
      </div>

      {/* Map over the modules and render each one */}
      {modules.map((m, index) => {
        // A module is unlocked if it's set as free preview OR the user bought the course
        const unlocked = m.isFree || purchased;

        return (
          <div className="card" key={m.id} style={{ borderLeft: unlocked ? '4px solid var(--primary)' : '4px solid var(--danger)' }}>
            <h4>{index + 1}. {m.title}</h4>

            {unlocked ? (
              // If unlocked, show the video iframe
              <div style={{ marginTop: '15px' }}>
                <iframe 
                  width="100%" 
                  // Removed fixed height, using CSS aspect-ratio instead
                  src={getEmbedUrl(m.video)} 
                  title={m.title}
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: '8px', aspectRatio: '16/9', height: 'auto' }}
                ></iframe>
              </div>
            ) : (
              // If locked, show the lock icon and prompt them to buy
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '4px', marginTop: '15px' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--danger)' }}>🔒 Premium Content Locked</p>
                <p className="text-muted">You need to purchase this course to access this module.</p>
                <button onClick={() => navigate(`/payment/${id}`)}>
                  Unlock Course
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CourseDetail;