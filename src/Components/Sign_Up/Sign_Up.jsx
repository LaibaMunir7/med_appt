// Following code has been commented with appropriate comments for your reference.

import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

// Function component for Sign Up form
const Sign_Up = () => {
  // State variables
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault();
    setShowerr("");

    // Validate phone number - exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      setShowerr("Phone number must contain exactly 10 digits.");
      return;
    }

    try {
      // API call to register user
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // Role is intentionally NOT sent to backend
        // because the Exercise 3 API code does not include role.
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
        }),
      });

      const json = await response.json();

      // Successful registration
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        // Go to Home page
        navigate("/");
        window.location.reload();
      } else {
        // Handle backend validation errors safely
        if (Array.isArray(json.errors)) {
          const messages = json.errors
            .map((error) => {
              if (typeof error === "string") {
                return error;
              }

              if (error && error.msg) {
                return error.msg;
              }

              return "Invalid information";
            })
            .join(", ");

          setShowerr(messages);
        } else if (typeof json.error === "string") {
          setShowerr(json.error);
        } else if (json.error && typeof json.error === "object") {
          setShowerr(json.error.msg || "Registration failed.");
        } else {
          setShowerr("Registration failed.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setShowerr("Unable to connect to the server.");
    }
  };

  // Reset form
  const resetForm = () => {
    setRole("");
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setShowerr("");
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">

        {/* Sign Up heading */}
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        {/* Login link */}
        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member?{" "}
          <span>
            <Link to="/login" style={{ color: "#2190FF" }}>
              Login
            </Link>
          </span>
        </div>

        {/* Sign Up form */}
        <div className="signup-form">
          <form method="POST" onSubmit={register}>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Role</label>

              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="form-control"
              >
                <option value="">Select your role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>

              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            {/* Error message */}
            {showerr && (
              <div
                className="err"
                style={{
                  color: "red",
                  marginBottom: "15px",
                }}
              >
                {showerr}
              </div>
            )}

            {/* Buttons */}
            <div className="btn-group">

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={resetForm}
              >
                Reset
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;