import transactionRoutes from "./transaction.js";
import authenticationRoutes from "./auth.js";
import UserApi from "./UserApi.js";
import { Router } from "express";
const router = Router();
import passport from "passport";
import categoryRoutes from './categoryRoutes.js'

const auth =passport.authenticate("jwt", { session: false })
router.use(
  "/transaction",
  auth,
  transactionRoutes
);
router.use("/auth", authenticationRoutes);
router.use("/user", UserApi);
router.use('/category',auth,categoryRoutes)

export default router;
