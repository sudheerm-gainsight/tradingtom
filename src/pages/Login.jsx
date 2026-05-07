import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  // Access the login function from our global AuthContext
  const { login } = useAuth();
  
  // useNavigate hook allows us to programmatically redirect the user
  const navigate = useNavigate();

  // Local state to track the user's input for email and phone number
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Function called when the user clicks the "Login" button
  const handleLogin = () => {
    // Basic validation
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    // Attempt to log in using the function from AuthContext
    const res = login(email, phoneNumber);

    // If login fails, show an alert and stop
    if (res.error) {
      alert(res.error);
      return;
    }

    alert("Login Successful!");

    // Role-based routing: If the user is the admin, send them to the admin dashboard
    if (email === "mrsudheer2009@gmail.com") {
      navigate("/admin");
    } else {
      // Otherwise, redirect normal users directly to the courses page
      navigate("/courses");
    }
  };

  return (
    // The .auth-box class from main.css centers the form and gives it a card look
    <div className="auth-box">
      <h2>Login</h2>

      {/* The .form-group wrapper provides consistent margins between inputs */}
      <div className="form-group">
        <label>Email Address (Mandatory)</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          // Update the email state whenever the user types
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone Number (Optional)</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          // Update the phone number state whenever the user types
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* Button to trigger handleLogin */}
      <button onClick={handleLogin}>Login Securely</button>
    </div>
  );
}

export default Login;