import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  // Access the signup function from AuthContext
  const { signup } = useAuth();
  const navigate = useNavigate();

  // State object to hold all form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    level: "Beginner", // Default selected radio button
    terms: false       // Default unchecked checkbox
  });

  // Function called when the user submits the form
  const handleSignup = () => {
    // Validate if the user accepted the terms
    if (!form.terms) {
      alert("You must accept the terms first.");
      return;
    }

    // Attempt to register the user via AuthContext
    const res = signup(form);

    // Show error if email already exists or another issue occurs
    if (res.error) {
      alert(res.error);
      return;
    }

    // On success, redirect to the courses page
    navigate("/courses");
  };

  return (
    <div className="auth-box">
      <h2>Create an Account</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          // Spread existing state and only update the 'name' property
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>


      {/* Radio Buttons for user level selection */}
      <div className="form-group">
        <label>Experience Level:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="level"
              checked={form.level === "Beginner"}
              onChange={() => setForm({ ...form, level: "Beginner" })}
            />
            Beginner
          </label>
          <label>
            <input
              type="radio"
              name="level"
              checked={form.level === "Advanced"}
              onChange={() => setForm({ ...form, level: "Advanced" })}
            />
            Advanced
          </label>
        </div>
      </div>

      {/* Checkbox for terms and conditions */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={form.terms}
            // Use e.target.checked instead of value for checkboxes
            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
          />
          I accept the Terms & Conditions
        </label>
      </div>

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;