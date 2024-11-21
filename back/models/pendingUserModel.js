import mongoose from "mongoose";

const activationExpirationDuration = 5 * 60 * 1000;

const pendingSchema =  new mongoose.Schema(
    {
        _id: {
            type: String,
            match: /^[0-9]{6}$/
        },
        email: {
            type: String,
            required: true,
            match: /^\S+@\S+\.\S+$/
        },
        expiration: {
            type: Date,
            default: () => (Date.now() + activationExpirationDuration),
        }
    }
);

const PendingUser = mongoose.model('PendingUser', pendingSchema);

export default PendingUser;