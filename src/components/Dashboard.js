import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const addExpense = useCallback((expense) => {
    setExpenses((prev) => [...prev, expense]);
  }, []);

  const updateExpense = useCallback((updated) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses]);

  const remaining = useMemo(() => {
    return income - totalExpense;
  }, [income, totalExpense]);

  return (
    <div className="dashboard">
      <button onClick={logout} style={{ background: "#dc3545" }}>
        Logout
      </button>

      <h2>Welcome, {user} 👋</h2>

      <input
        type="number"
        placeholder="Enter your income"
        value={income}
        onChange={(e) => setIncome(Number(e.target.value))}
      />

      <h3>Income: ₹{income}</h3>
      <h3>Total Expenses: ₹{totalExpense}</h3>

      <h3 style={{ color: remaining >= 0 ? "green" : "red" }}>
        Remaining Balance: ₹{remaining}
      </h3>

      <ExpenseForm addExpense={addExpense} />

      <ExpenseList
        expenses={expenses}
        onUpdate={updateExpense}
        onDelete={deleteExpense}
      />
    </div>
  );
}

export default Dashboard;
