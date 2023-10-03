import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import database from './database/mongodb.js'
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from 'dotenv'
import router from "./routes/index.js";

dotenv.config()
const PORT = 4000;
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/', router)
app.use(passport.initialize())
passportConfig(passport)


//   .then(() => console.log("db connected")).catch((err)=>console.error(err));

  //res.json({success:true,transaction});
  database()

app.listen(PORT, () => {
  console.log(`server running under port ${PORT}`);
});
