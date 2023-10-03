import express from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import * as TransactionContoller from "../controller/TransactionController.js";

const router = express.Router();

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  TransactionContoller.index
);

router.post("/", TransactionContoller.createTransaction);

router.delete("/:id", TransactionContoller.deleteTransaction);

router.patch("/:id", TransactionContoller.updateTransaction);

export default router;
