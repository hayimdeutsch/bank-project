import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    to: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
},  
{
    timestamps: { createdAt: 'time', updatedAt: false }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;