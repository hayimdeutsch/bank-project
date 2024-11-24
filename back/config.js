import mongoose from "mongoose";
import nodemailer from "nodemailer";

export const connectDB = async () => {
    const uri = process.env.MONGO_CONNECTION_STRING;
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    await mongoose.connect(uri, clientOptions);
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const expirationTime = 5 * 60 * 1000;

export const cleanUpInterval = 60 * 60 * 1000;