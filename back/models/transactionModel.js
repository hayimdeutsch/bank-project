import mongoose from "mongoose";
import { Decimal128 } from "mongoose";

const TransactionSchema = new mongoose.Schema({
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
        type: Decimal128,
        required: true,
        validate: {
            validator: (v) => v > 0,
            message: "Transaction amount must be more than 0",
        },
    },
},  
{
    timestamps: { createdAt: 'time', updatedAt: false }
});

TransactionSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.amount = new Number(ret.amount).toFixed(2);
      return ret;
    },
  });

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;