import { error } from "console";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/Transaction.js";

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
await mongoose.connect(
  "mongodb+srv://murugappansj:murugappansj123@cluster0.w6s1o7v.mongodb.net/expense-tracker"
);
console.log("db connected");
//   .then(() => console.log("db connected")).catch((err)=>console.error(err));
app.get("/", (req, res) => {
  console.log("hello world");
});
app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = await Transaction.create(req.body);
  console.log(req.body);
  res.status(200).json({
    success: true,
    transaction
  });
  app.get('/transaction',async(req,res)=>{
    const transaction = await Transaction.find({}).sort({createdAt:-1})
    res.status(200).json({
      success: true,
     data: transaction
    })

  })
  //res.json({success:true,transaction});
});
app.listen(PORT, () => {
  console.log(`server running under port ${PORT}`);
});
