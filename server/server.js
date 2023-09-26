import { error } from "console";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"

const PORT = 4000;
const app = express();
app.use(cors())

await mongoose
  .connect(
    "mongodb+srv://murugappansj:murugappansj123@cluster0.w6s1o7v.mongodb.net/expense-tracker"
  )
  console.log("db connected")
//   .then(() => console.log("db connected")).catch((err)=>console.error(err));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`server running under port ${PORT}`);
});
