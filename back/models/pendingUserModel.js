import mongoose from "mongoose";
import { expirationTime } from "../config.js";

const pendingUserSchema =  new mongoose.Schema(
    {
        _id: {
            type: String,
            match: /^\S+@\S+\.\S+$/,
        },
        confirmationCode: {
            type: String,
            match: /^[0-9]{6}$/,
            index: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        expiration: {
            type: Date,
            default: () => (Date.now() + expirationTime),
        }
    }
);

const PendingUser = mongoose.model('PendingUser', pendingUserSchema);

export default PendingUser;