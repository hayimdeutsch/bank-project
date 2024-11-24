import { Router } from "express";
import { 
    getInfo,
    getBalance, 
    getTransactions, 
    postTransactions } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authenticateAccessToken.js";
import { sendTransactionValidator } from "../middleware/validators.js";

const userRouter = Router();
userRouter.use(authenticateToken);

userRouter.get("/info", getInfo);
userRouter.get("/balance", getBalance);
userRouter.route("/transactions").get(getTransactions)
            .post(sendTransactionValidator, postTransactions);

export default userRouter;