import User from '../models/userModel.js';
import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';

export const getInfo = async (req, res) => {
    try {
        const user = await User.findById(req.body.email);
        let userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user._id,
            phone: user.phone
        };
        return res.status(200).json({msg: "Success", userInfo});
    } catch (err) {
        console.log(err);
        return res.status (500).json({msg: "Internal server error"});
    }
}

export const getBalance = async (req, res) => {
    try {
        let userData = await User.findById(req.body.email);
        res.status(200).json({balance: userData.balance});
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: err.message})
    }
}

export const getTransactions = async (req, res) => {
    try {
        let userTransactions = 
        await User.findById(req.body.email, "transactions -_id")
        .populate({
            path: 'transactions',
            select: 'from to amount -_id',
            options: { getters: true },
    })
        .exec();
        res.status(200).json({transactions: userTransactions.transactions});
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

export const postTransactions = async (req, res) => {
    let { email, to, amount } = req.body;

    if (email == to) {
        return res.status(400).json({ msg: "You can't send money to yourself" });
    }

    let from = null;
    
    try {
        from = await User.findById(email);
        to = await User.findById(to);
    } catch (err) {
        return res.status(500).json({msg: "Internal Server Error"});
    }
    if (!to) {
        return res.status(400).json({msg: "Recipient not found"});
    }
    if (from.balance < amount) {
        return res.status(400).json({msg: "Insufficient funds"});
    }
    let transaction = new Transaction({
        from: from._id, 
        to: to._id, 
        amount
    });

    let session = await mongoose.connection.startSession();
    try {
        session.startTransaction();
        await transaction.save({session});
        await User.findByIdAndUpdate(from._id, 
            {
                $inc : {balance : -amount}, 
                $push: {transactions: transaction._id}
            },{session});
        await User.findByIdAndUpdate(to._id, 
            {
                $inc : {balance : amount}, 
                $push: {transactions: transaction._id}
            }, {session});

        await session.commitTransaction()
        res.status(200).json({msg: "Successful transaction"});
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        res.status(500).json({msg: "Internal Server Error"})
    } finally {
        session.endSession()
    }
}
