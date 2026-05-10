import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/api";

function AboutCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const course = getCourseById(Number(id));

  if (!course) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Course not found</h2>
        <button onClick={() => navigate('/courses')}>Back to Courses</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '40px auto', padding: '30px' }}>
      <h2>About This Course</h2>
      <hr style={{ margin: '15px 0', border: '1px solid var(--border-color)' }} />
      
      <div style={{ margin: '20px 0' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{course.title}</h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
          <strong>Level:</strong> {course.level}
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          <strong>Price:</strong> ₹{course.price}
        </p>
        
        <p className="text-muted" style={{ lineHeight: '1.6' }}>
          This course is designed to take your skills to the next level. Join us to learn
          comprehensive strategies, techniques, and the mindset required for success in trading.
          With detailed modules and expert guidance, you'll be well-equipped to navigate the markets.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button className="secondary" onClick={() => navigate(`/course/${id}`)}>
          Back to Course
        </button>
        <button onClick={() => navigate(`/payment/${id}`)}>
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default AboutCourse;
