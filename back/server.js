import 'dotenv/config.js';
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import removeInactiveUsers from './utils/runCleanUp.js';
import errorHandler from './middleware/errorHandler.js';
import mainRouter from './routes/mainRouter.js';
import { 
    cleanUpInterval, 
    connectDB, 
    corsOptions, 
} from './config.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1", mainRouter);
app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await connectDB();
    console.log(`listening on port ${port}`);
})

setInterval(removeInactiveUsers, cleanUpInterval);
