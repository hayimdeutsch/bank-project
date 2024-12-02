import 'dotenv/config.js';

import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";

import userRouter from './routes/userRouter.js';
import signUpRouter from './routes/signupRouter.js';
import adminRouter from './routes/adminRouter.js';

import { logIn, logOut } from './controllers/loginController.js';
import { tokenRefresh } from './controllers/refreshController.js';
import { loginValidator } from './middleware/validators.js';
import removeInactiveUsers from './utils/runCleanUp.js';
import errorHandler from './middleware/errorHandler.js';
import { 
    cleanUpInterval, 
    connectDB, 
    corsOptions, 
    expirationTime 
} from './config.js';
import { getAllUsers, postDeposit } from './utils/db.js';


const app = express();

const router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
  
router.post("/login", loginValidator, logIn);
router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/signup", signUpRouter);
router.post("/refresh", tokenRefresh);
router.post("/logout", logOut);

app.use("/api/v1", router);
app.use(errorHandler)
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await connectDB();
    console.log(`listening on port ${port}`);
})

setInterval(removeInactiveUsers, cleanUpInterval);
