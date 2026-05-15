import { useParams, useNavigate } from "react-router-dom";
import { purchaseCourse, getCourses } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Payment() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Success");

  // Fetch all courses and handle pre-selection if an ID is present in the URL
  useEffect(() => {
    const allCourses = getCourses();
    setCourses(allCourses);

    if (id) {
      const courseId = Number(id);
      setSelectedCourses([courseId]);
    }
  }, [id]);

  // Handle checking/unchecking courses
  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(cId => cId !== courseId)
        : [...prev, courseId]
    );
  };

  // Process the simulated payment
  const handlePay = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course to purchase.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    if (status === "Failure") {
      alert("Payment failed! Please try again or use a different method.");
      return;
    }

    // Success flow
    selectedCourses.forEach(courseId => {
      purchaseCourse(user.id, courseId);
    });

    alert("Payment Successful! You now have full access to the selected courses.");

    // Redirect logic based on selection count
    if (selectedCourses.length === 1) {
      navigate(`/course/${selectedCourses[0]}`);
    } else {
      navigate('/courses');
    }
  };

  // Calculate dynamic total
  const totalAmount = selectedCourses.reduce((total, courseId) => {
    const course = courses.find(c => c.id === courseId);
    return total + (course ? course.price : 0);
  }, 0);

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '40px auto', padding: '30px' }}>
      <h2>Complete Payment</h2>
      <p className="text-muted" style={{ marginBottom: '20px' }}>Select courses and finalize your payment details.</p>

      {/* Course Selection Area */}
      <div style={{ marginBottom: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '15px' }}>
        <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Select Courses</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
          {courses.map(course => (
            <label key={course.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => toggleCourseSelection(course.id)}
              />
              <span style={{ flex: 1 }}>{course.title}</span>
              <span style={{ fontWeight: 'bold' }}>₹{course.price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* New Form Inputs */}
      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Payment Status Simulation</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>
      </div>

      {/* Dynamic Total Amount Display */}
      <div style={{ margin: '20px 0', padding: '15px', background: 'rgba(0, 200, 83, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--primary)' }}>Total Amount: ₹{totalAmount}</h3>
      </div>

      {/* Note: Explicitly requested black text color */}
      <button
        onClick={() => {
          { handlePay };
          if (window.aptrinsic) {
            window.aptrinsic('track', 'Payment_done_tracking',
              { "amount_paid": totalAmount, "click": "Payment_done_tracking", "payement_date": date, "status": status });
          }
        }}

        style={{ width: '100%', marginTop: '10px', color: 'black' }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;