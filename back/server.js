import 'dotenv/config.js';

import express from "express";
import bankRouter from './routes/loginRoutes.js';
import userRouter from './routes/userRoutes.js';
import signUpRouter from './routes/signupRoutes.js';
import { tokenRefresh } from './controllers/refreshController.js';
import { connectDB } from './config.js';

const app = express();

app.use(express.json());
app.use("/api/v1", bankRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/signup", signUpRouter);
app.post("/api/v1/refresh", tokenRefresh);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await connectDB();
    console.log(`listening on port ${port}`);
})