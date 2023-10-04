import Transaction from "../models/Transaction.js";

// export const index = async (req, res) => {
//   const transaction = await Transaction.find({user_id:req.user._id}).sort({ createdAt: -1 });
//   const demo = await Transaction.aggregate([
//     {
//       $match:{user_id:req.user._id}
//     },{
//       $group:{
//         _id:{$month:"$date"},
//         transactions:{$push:{amount:"$amount",description:"$description, date:"$date", },},
        
//       },
//     },
//   ])
//   res.status(200).json({
//     success: true,
//     data: transaction,
//   });
// };
export const index = async (req, res) => {
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            amount: "$amount",
            description: "$description",
            date: "$date",
            type: "$type",
            _id: "$_id",
          },
        },
        totalExpenses: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json({ data: demo });
};

export const createTransaction = async (req, res) => {
  console.log(req.user);
  const { amount, description, date,category_id } = req.body;
  const transaction = await Transaction.create({
    amount,
    description,
    user_id: req.user._id,
    date,
    category_id,
  });
  console.log(req.body);
  res.status(200).json({
    success: true,
    transaction,
  });
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
  });
  res.status(201).json({
    success: true,
    message: " deleted Succesfully",
  });
};

export const updateTransaction = async (req, res) => {
  const transaction = await Transaction.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(201).json({
    success: true,
    transaction,
  });
};
