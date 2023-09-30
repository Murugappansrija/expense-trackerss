import { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import { Container } from "@mui/material";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEdittransaction] = useState({});
  useEffect(() => {
    fetchTransction();
  }, []);
  async function fetchTransction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <div>
      <AppBar />
      <Container>
        <TransactionForm
          fetchTransction={fetchTransction}
          editTransaction={editTransaction}
        />
        <TransactionsList
          transactions={transactions}
          fetchTransction={fetchTransction}
          setEdittransaction={setEdittransaction}
        />
      </Container>
    </div>
  );
}

export default App;
