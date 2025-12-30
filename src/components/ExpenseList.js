import { useState } from "react";

function ExpenseList({ expenses, onUpdate, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const startEdit = (e) => {
    setEditId(e.id);
    setTitle(e.title);
    setAmount(e.amount);
  };

  const save = () => {
    onUpdate({ id: editId, title, amount: Number(amount) });
    setEditId(null);
  };

  return (
    <ul>
      {expenses.map(e => (
        <li key={e.id}>
          {editId === e.id ? (
            <>
              <input value={title} onChange={ev => setTitle(ev.target.value)} />
              <input
                type="number"
                value={amount}
                onChange={ev => setAmount(ev.target.value)}
              />
              <button onClick={save}>Save</button>
            </>
          ) : (
            <>
              {e.title} - ₹{e.amount}
              <button onClick={() => startEdit(e)}>Edit</button>
              <button onClick={() => onDelete(e.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
