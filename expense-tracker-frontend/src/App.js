import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracker" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
