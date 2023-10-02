import express from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res)=> {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: transaction
      });
  }
);

// router.get("/", async (req, res) => {
//   const transaction = await Transaction.find({}).sort({ createdAt: -1 });
//   res.status(200).json({
//     success: true,
//     data: transaction,
//   });
// });
router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = await Transaction.create({ amount, description, date });
  console.log(req.body);
  res.status(200).json({
    success: true,
    transaction
  });
});
router.delete("/:id", async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
  });
  res.status(201).json({
    success: true,
    message: " deleted Succesfully"
  });
});
router.patch("/:id", async (req, res) => {
  const transaction = await Transaction.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(201).json({
    success: true,
    transaction,
  });
});
export default router;
