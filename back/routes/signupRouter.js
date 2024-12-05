import { Router } from "express";
import { signUpValidator } from "../middleware/validators.js";
import { 
  signUp, 
  confirmActivation, 
  resendActivation,
  cancelRegistration
} from "../controllers/signupController.js";

const signUpRouter = Router();

signUpRouter.post("/", signUpValidator, signUp);
signUpRouter.post("/confirmation", confirmActivation);
signUpRouter.post("/confirmation/resend", resendActivation);
signUpRouter.post("/cancel", cancelRegistration)

export default signUpRouter;