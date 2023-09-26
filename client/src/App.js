import { useState } from "react";
function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date:"",
  });
   async function handleSubmit(e) {
    e.preventDefault();
   const res= await fetch('http://localhost:4000/transacation',{
      method :"POST",
      body: form,
    })
    console.log(res)
  }
  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Enter a Transaction amount"
          onChange={handleInput}
          value={form.amount}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter a Transaction details"
          onChange={handleInput}
          value={form.description}
        />
        <input
          type="date"
          name=" date"
          onChange={handleInput}
          value={form.date}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
