import transactionRoutes from "./transaction.js";
import authenticationRoutes from "./auth.js";
import UserApi from "./UserApi.js";
import { Router } from "express";
const router = Router();
import passport from "passport";
router.use(
  "/transaction",
  passport.authenticate("jwt", { session: false }),
  transactionRoutes
);
router.use("/auth", authenticationRoutes);
router.use("/user", UserApi);

export default router;
