const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add expense
router.post("/", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).json(expense);
});

// Get all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});

module.exports = router;
