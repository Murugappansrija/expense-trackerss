import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchTransction()
  }, []);
  async function fetchTransction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    // const data = await res.json();
    //  console.log(data);
    
      fetchTransction()
  
   
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
          name="date"
          onChange={handleInput}
          value={form.date}
        />
        <button type="submit">Submit</button>
      </form>
      <br />

      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((trans) => (
              <tr key={trans._id}>
                <td>{trans.amount}</td>
                <td> {trans.description} </td>
                <td> {trans.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
