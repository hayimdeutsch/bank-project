import { Router } from "express";

import { authenticateToken } from "../middleware/authenticateAccessToken.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";
import { 
  loginAdmin, 
  getUsersAutocomplete, 
  postUserDeposit 
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin)

adminRouter.use(authenticateToken);
adminRouter.use(authenticateAdmin);

adminRouter.get("/users/", getUsersAutocomplete);
adminRouter.post("/deposits", postUserDeposit);

export default adminRouter;
