import { Router } from "express";
import { logIn } from "../controllers/loginController.js";
import { loginValidator } from "../middleware/validators.js";

const bankRouter = Router();

bankRouter.post("/login", loginValidator, logIn);

export default bankRouter;
