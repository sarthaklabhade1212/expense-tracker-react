import { useRef, useState } from "react";

function ExpenseForm({ addExpense }) {
  const titleRef = useRef();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const submit = () => {
    addExpense({
      id: Date.now(),
      title: titleRef.current.value,
      amount: Number(amount),
      category,
      date
    });
    titleRef.current.value = "";
    setAmount("");
    setDate("");
    titleRef.current.focus();
  };

  return (
    <>
      <input ref={titleRef} placeholder="Expense Title" />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <button onClick={submit}>Add Expense</button>
    </>
  );
}

export default ExpenseForm;
