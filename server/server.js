import { error } from "console";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
// import Transaction from "./models/Transaction.js";
import transactionRoutes from './routes/transaction.js'

const PORT = 4000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/transaction', transactionRoutes)


await mongoose.connect(
  "mongodb+srv://murugappansj:murugappansj123@cluster0.w6s1o7v.mongodb.net/expense-tracker"
);
console.log("db connected");
//   .then(() => console.log("db connected")).catch((err)=>console.error(err));

  //res.json({success:true,transaction});

app.listen(PORT, () => {
  console.log(`server running under port ${PORT}`);
});
