import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Landing() {
  const { user, isAdmin } = useAuth();

  // If a user is already logged in, we shouldn't show them the marketing landing page.
  // Instead, redirect them straight to the content. Admins go to /admin, users to /courses.
  if (user) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/courses" />;
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      {/* Main heading for the landing page */}
      <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '20px' }}>
        Welcome to TradingTom
      </h1>
      
      {/* Subheading with muted text for better contrast */}
      <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px' }}>
        Master the stock market with real strategies, premium courses, and an active community of traders.
      </p>

      {/* Primary Call to Action button */}
      <Link to="/courses">
        <button style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
          Explore Our Courses
        </button>
      </Link>
      
      {/* Optional Secondary Action */}
      <div style={{ marginTop: '20px' }}>
        <p className="text-muted">
          Already a member? <Link to="/login">Log In Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Landing;