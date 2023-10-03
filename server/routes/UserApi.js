import express from "express";

import jwt from "jsonwebtoken";
import passport from "passport";
import * as userController from '../controller/userController.js'

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.index
  // (req, res) => {
  //   res.json({ user: req.user });
  // }
);

export default router;
