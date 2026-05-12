import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Landing() {
  const { user } = useAuth();

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      {/* Main heading for the home page */}
      <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '20px' }}>
        Welcome to TradingTom
      </h1>
      
      {/* About Application Content */}
      <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 40px' }}>
        TradingTom is your ultimate destination for mastering the stock market. 
        Our platform provides expert-led courses, real-time market analysis, and a supportive community to help you navigate the world of trading with confidence.
      </p>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'left', padding: '30px' }}>
        <h3>Why Choose TradingTom?</h3>
        <ul style={{ marginTop: '15px', lineHeight: '1.8' }}>
          <li><strong>Expert Instruction:</strong> Learn from seasoned traders with years of experience.</li>
          <li><strong>Comprehensive Curriculum:</strong> From basics to advanced technical analysis.</li>
          <li><strong>Practical Learning:</strong> Real strategies applied directly to your trading.</li>
          <li><strong>Interactive Community:</strong> Connect with fellow traders and grow together.</li>
        </ul>
      </div>

      <Link to="/courses">
        <button style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
          Start Learning Now
        </button>
      </Link>
    </div>
  );
}

export default Landing;