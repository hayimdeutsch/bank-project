import mongoose from "mongoose";
import nodemailer from "nodemailer";

const connectDB = async () => {
    const uri = process.env.MONGO_CONNECTION_STRING;
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    await mongoose.connect(uri, clientOptions);
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
    credentials: true,
}

const codeExpiryMins = 5;

const expirationTime = codeExpiryMins * 60 * 1000;

const cleanUpInterval = 60 * 60 * 1000;

export { 
    connectDB, 
    transporter, 
    codeExpiryMins, 
    expirationTime, 
    cleanUpInterval,
    corsOptions
};