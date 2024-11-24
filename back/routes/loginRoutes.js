import { Router } from "express";
import { logIn } from "../controllers/loginController.js";
import { loginValidator } from "../middleware/validators.js";
import { authenticateToken } from "../middleware/authenticateAccessToken.js";

const bankRouter = Router();

bankRouter.post("/login", loginValidator, logIn);
bankRouter.post("/logout", authenticateToken, logOut);

export default bankRouter;
