import mongoose from "mongoose";
async  function database(){ await mongoose.connect(
    "mongodb+srv://murugappansj:murugappansj123@cluster0.w6s1o7v.mongodb.net/expense-tracker"
  );
  console.log("db connected");
}
  export default database