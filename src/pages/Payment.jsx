import { useParams, useNavigate } from "react-router-dom";
import { purchaseCourse } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Payment() {
  // Extract the course ID from the URL parameters
  const { id } = useParams();
  
  // Get the current logged-in user
  const { user } = useAuth();
  const navigate = useNavigate();

  // State to track which payment method is selected (default is UPI)
  const [method, setMethod] = useState("upi");

  // Function called to finalize the simulated payment
  const handlePay = () => {
    // Record the purchase in our fake database
    purchaseCourse(user.id, Number(id));
    alert("Payment Successful! You now have full access.");
    
    // Redirect back to the course details page which will now show the unlocked content
    navigate(`/course/${id}`);
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Complete Payment</h2>
      <p className="text-muted">Choose your preferred payment method below.</p>

      {/* Radio buttons for payment selection grouped with flexbox layout */}
      <div className="radio-group">
        <label>
          <input 
            type="radio" 
            name="paymentMethod"
            checked={method === "upi"} 
            onChange={() => setMethod("upi")} 
          />
          UPI
        </label>

        <label>
          <input 
            type="radio" 
            name="paymentMethod"
            checked={method === "card"}
            onChange={() => setMethod("card")} 
          />
          Credit/Debit Card
        </label>
      </div>

      <button onClick={handlePay} style={{ width: '100%', marginTop: '20px' }}>
        Pay Now
      </button>
    </div>
  );
}

export default Payment;