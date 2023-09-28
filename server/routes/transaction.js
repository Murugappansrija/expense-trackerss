import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();



router.get("/", async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: transaction,
  });
});
router.post("/", async (req, res) => {
    const { amount, description, date } = req.body;
    const transaction = await Transaction.create({amount, description, date});
    console.log(req.body);
    res.status(200).json({
      success: true,
      transaction,
    });
  });
  router.delete('/:id',async(req,res)=>{
     
      await Transaction.findOneAndDelete({_id:req.params.id})
      res.json({
        success: true,
        message:" deleted Succesfully"
      })
  })
export default router
