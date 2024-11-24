import { Router } from "express";
import { signUp, confirmActivation, resendActivation } from "../controllers/signupController.js";
import { signUpValidator } from "../middleware/validators.js";

const signUpRouter = Router();

signUpRouter.post("/", signUpValidator, signUp);
signUpRouter.post("/confirmation", confirmActivation);
signUpRouter.post("/confirmation/resend", resendActivation);
export default signUpRouter;