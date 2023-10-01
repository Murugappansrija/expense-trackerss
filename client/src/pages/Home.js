import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";

const Home = () => {
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
  )
}

export default Home