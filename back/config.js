import "dotenv/config";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const connectDB = async () => {
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, clientOptions);
    console.log("Connected to MongoDB")
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

const codeExpiryMins = 5;
const expirationTime = codeExpiryMins * 60 * 1000;
const accessTokenExpiration = '15m';
const refreshTokenExpiration = '3h';

export { 
    connectDB, 
    transporter, 
    codeExpiryMins, 
    expirationTime, 
    accessTokenExpiration,
    refreshTokenExpiration,
    corsOptions
};