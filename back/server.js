import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import errorHandler from "./middleware/errorHandler.js";
import mainRouter from "./routes/mainRouter.js";
import { connectDB, corsOptions } from "./config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1", mainRouter);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectDB();
  console.log(`listening on port ${port}`);
});
