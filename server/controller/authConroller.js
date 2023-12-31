import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const categories= []
const categories = [
  { label: "Travel" , icon: "user"},
  { label: "Food" , icon: "user"},
  { label: "shooping", icon: "user" },
  { label: "invesment", icon: "user" },
  { label: "entertainment", icon: "user" },
];

export const registerController = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  //already registered user
  const registeredUser = await User.findOne({ email });
  if (registeredUser) {
    res.status(406).json({
      message: "User already exist",
    });
    return;
  }
  //Protect password before save
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    categories,
  });
  res.status(201).json({
    success: true,
    user,
  });
};

export const loginController = 
async (req, res) => {
  const { email, password } = req.body;
  const registeredUser = await User.findOne({ email });
  if (!registeredUser) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }
  const comparePassword = await bcrypt.compare(password, registeredUser.password);
  if (!comparePassword) {
    res.json({
      message: "Invalid Credentials",
    });
    return;
  }
  //create jwt token
  const payload = {
   email,
    _id: registeredUser._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({
    message: "Login successfully",
    token,
    registeredUser,
  });
}