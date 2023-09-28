import { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import { Container } from "@mui/material";

// const initialForm ={ amount: 0,
//   description: "",
//   date: "",}

function App() {
  // const [form, setForm] = useState(initialForm);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchTransction();
  }, []);
  async function fetchTransction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const res = await fetch("http://localhost:4000/transaction", {
  //     method: "POST",
  //     body: JSON.stringify(form),
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });
  //   // const data = await res.json();
  //   //  console.log(data);
  //   if(res.ok){
  //      setForm(initialForm)
  //     fetchTransction()
  //   }

  // }
  // function handleInput(e) {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // }
  return (
    <div>
      <AppBar />
      <Container>
        <TransactionForm fetchTransction={fetchTransction} />
        <TransactionsList transactions={transactions}  fetchTransction={fetchTransction} />
      </Container>
    </div>
  );
}

export default App;
