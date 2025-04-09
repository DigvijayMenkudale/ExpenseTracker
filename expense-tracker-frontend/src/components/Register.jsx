// import React, { useState } from "react";
// import axios from "../utils/axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/register", form);
//       alert("Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       alert("Registration failed. Email may already exist.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "40px" }}>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      setMessage({ type: "error", text: "All fields are required." });
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("/register", form);
      setMessage({ type: "success", text: "Registered successfully!" });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage({ type: "error", text: "Email already exists." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        {message.text && (
          <div className={`auth-message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
