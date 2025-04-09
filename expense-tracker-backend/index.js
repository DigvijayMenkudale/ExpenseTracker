const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://localhost:27017/expenseTracker")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
// app.use("/api", authRoutes);
// app.use("/api/expenses", expenseRoutes);
app.use("/api", authRoutes); // handles /api/register and /api/login
app.use("/api/expenses", expenseRoutes); // handles /api/expenses CRUD

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
