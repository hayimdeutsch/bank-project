import mongoose from "mongoose";
import { Decimal128, ObjectId } from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        validate: {
            validator: async function (value) {
              const existingUser = await mongoose.model("User").findById(value);
              return !existingUser;
            },
            message: "Email already exists",
          },
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
        type: Decimal128,
        default: 0,
        get: (num) => new Number(num).toFixed(2).toString()
    },
    transactions: [{
        type: ObjectId,
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
