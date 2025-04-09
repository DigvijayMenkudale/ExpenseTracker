// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // You can validate credentials here
//     navigate("/tracker");
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Please fill all fields." });
      return;
    }
    // You can validate credentials with backend
    setMessage({ type: "success", text: "Logged in successfully!" });
    setTimeout(() => {
      navigate("/tracker");
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        {message.text && (
          <div className={`auth-message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
