import { Router } from "express";
import { signUp, confirmActivation } from "../controllers/signupController.js";
import { signUpValidator } from "../middleware/validators.js";

const signUpRouter = Router();

signUpRouter.post("/", signUpValidator, signUp);
signUpRouter.post("/confirmation", confirmActivation);

export default signUpRouter;