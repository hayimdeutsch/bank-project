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
    balance: {
        type: Number,
        default: () => (Math.floor(1000 + Math.random() * 9000).toString())
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Transaction'
    }]
},
{
    timestamps: true
}
);
  
const User = mongoose.model('User', UserSchema);

export default User;
