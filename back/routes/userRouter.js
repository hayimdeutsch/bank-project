import { Router } from "express";
import { 
    getInfo,
    getBalance, 
    getTransactions, 
    postTransactions } from "../controllers/userController.js";
import authenticateAccessToken from "../middleware/authenticateAccessToken.js";
import { sendTransactionValidator } from "../middleware/validators.js";

const userRouter = Router();
userRouter.use(authenticateAccessToken);

userRouter.get("/info", getInfo);
userRouter.get("/balance", getBalance);
userRouter.route("/transactions").get(getTransactions)
            .post(sendTransactionValidator, postTransactions);

export default userRouter;