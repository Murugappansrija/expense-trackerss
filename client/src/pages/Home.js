import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import Cookies from 'js-cookie'

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEdittransaction] = useState({});
    useEffect(() => {
      fetchTransction();
    }, []);
    async function fetchTransction() {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
      // headers:{
      //   Authorization: `Bearer${token}`,
      // },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      })
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