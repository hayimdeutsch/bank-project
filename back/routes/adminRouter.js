import { Router } from "express";

import { authenticateToken } from "../middleware/authenticateAccessToken.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";
import { getUsersAutocomplete, postUserDeposit } from "../controllers/adminController.js";

const adminRouter = Router();
adminRouter.use(authenticateToken);
adminRouter.use(authenticateAdmin);

adminRouter.get("/users/", getUsersAutocomplete);
adminRouter.post("/transactions", postUserDeposit);

export default adminRouter;
