import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        match: /^\S+@\S+\.\S+$/
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
    activated: {
        type: Boolean,
        default: false,
    },
    balance: {
        type: Number,
        default: 1000
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Transaction'
    }]
});
  
const User = mongoose.model('User', UserSchema);

export default User;
