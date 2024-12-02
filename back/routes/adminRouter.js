import { Router } from "express";

import authenticateAccessToken from "../middleware/authenticateAccessToken.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";
import { 
  loginAdmin, 
  postUserDeposit, 
  logoutAdmin, 
  getUsers 
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);

adminRouter.use(authenticateAccessToken);
adminRouter.use(authenticateAdmin);

adminRouter.get("/users/", getUsers);
adminRouter.post("/deposits", postUserDeposit);

export default adminRouter;
