
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
// import Transaction from "./models/Transaction.js";
import transactionRoutes from './routes/transaction.js'
import database from './database/mongodb.js'
import authenticationRoutes from './routes/auth.js'
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from 'dotenv'

dotenv.config()
const PORT = 4000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/transaction', transactionRoutes)
app.use('/auth', authenticationRoutes)
app.use(passport.initialize())
passportConfig(passport)


//   .then(() => console.log("db connected")).catch((err)=>console.error(err));

  //res.json({success:true,transaction});
  database()

app.listen(PORT, () => {
  console.log(`server running under port ${PORT}`);
});
