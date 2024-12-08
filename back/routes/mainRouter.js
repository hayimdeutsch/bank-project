import { Router } from "express";

import userRouter from './userRouter.js';
import signUpRouter from './signupRouter.js';
import adminRouter from './adminRouter.js';
import { logIn, logOut } from '../controllers/loginController.js';
import { tokenRefresh } from '../controllers/refreshController.js';
import { loginValidator } from '../middleware/validators.js';

const mainRouter = Router();

mainRouter.post("/login", loginValidator, logIn);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/signup", signUpRouter);
mainRouter.post("/refresh", tokenRefresh);
mainRouter.post("/logout", logOut);

export default mainRouter;