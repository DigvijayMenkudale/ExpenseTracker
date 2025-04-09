import React, { useState, useEffect } from "react";
import axios from "axios";

function ExpenseTracker() {
  const [form, setForm] = useState({ title: "", amount: "" });
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "" });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/expenses", form);
    setForm({ title: "", amount: "" });
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditForm({ title: expense.title, amount: expense.amount });
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/expenses/${id}`, editForm);
    setEditingId(null);
    fetchExpenses();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ title: "", amount: "" });
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleAdd}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>
                {editingId === exp._id ? (
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                  />
                ) : (
                  exp.title
                )}
              </td>
              <td>
                {editingId === exp._id ? (
                  <input
                    name="amount"
                    type="number"
                    value={editForm.amount}
                    onChange={handleEditChange}
                  />
                ) : (
                  exp.amount
                )}
              </td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>
                {editingId === exp._id ? (
                  <>
                    <button onClick={() => handleUpdate(exp._id)}>
                      Update
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(exp)}>Edit</button>
                    <button onClick={() => handleDelete(exp._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTracker;
