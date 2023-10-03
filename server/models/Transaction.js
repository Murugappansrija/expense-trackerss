import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  amount: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  category_id: {
     type: mongoose.Types.ObjectId
     },
  date: {
    required: true,
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);
