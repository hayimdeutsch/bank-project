import { Router } from "express";

import authenticateAccessToken from "../middleware/authenticateAccessToken.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js";
import { loginAdmin, getUsersAutocomplete,  postUserDeposit, logoutAdmin } 
                                      from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);


adminRouter.use(authenticateAccessToken);
adminRouter.use(authenticateAdmin);

adminRouter.get("/users/", getUsersAutocomplete);
adminRouter.post("/deposits", postUserDeposit);

export default adminRouter;
