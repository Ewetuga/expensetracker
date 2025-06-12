
import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 50, date: '2025-06-10' },
    { id: 2, title: 'Internet', amount: 30, date: '2025-06-11' },
    { id: 3, title: 'Transport', amount: 15, date: '2025-06-12' },
  ]);
  const [form, setForm] = useState({ title: '', amount: '', date: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title: form.title,
        amount: parseFloat(form.amount),
        date: form.date,
      },
    ]);
    setForm({ title: '', amount: '', date: '' });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="expense-tracker-container">
      <h1 className="fade-in">Expense Tracker</h1>
      <form className="expense-form slide-in" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul className="expense-list fade-in">
        {expenses.length === 0 && <li className="empty">No expenses yet.</li>}
        {expenses.map((exp) => (
          <li key={exp.id} className="expense-item pop-in">
            <div>
              <span className="expense-title">{exp.title}</span>
              <span className="expense-date">{new Date(exp.date).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="expense-amount">${exp.amount.toFixed(2)}</span>
              <button className="delete-btn" onClick={() => handleDelete(exp.id)} title="Delete">✕</button>
            </div>
          </li>
        ))}
      </ul>
      <footer className="footer fade-in">
        <span>Expense Tracker &copy; {new Date().getFullYear()} &mdash; Expense tracker</span>
      </footer>
    </div>
  );
}

export default App
