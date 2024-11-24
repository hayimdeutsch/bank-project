import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
import mongoose from "mongoose";

export const getUsersAutocomplete = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ msg: "Search term is required" });
    }

    const results = await User.find(
      { _id: { $regex: `^${searchTerm}`, $options: 'i' } }
    )
    .limit(10)
    .select({ _id: 1 })
    .lean();

    const users = results.map((doc) => ({ email: doc._id }));

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const postUserDeposit = async (req, res) => {
  const { email, amount } = req.body;
 
  if (!email || !amount) {
    return res.status(400).json({msg: "Missing fields"})
  }

  const transaction = new Transaction({
    from: email,
    to: email,
    amount,
  });

  let session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    await transaction.save({session});
    await User.findByIdAndUpdate(email, 
      {
          $inc : {balance : amount}, 
          $push: {transactions: transaction._id}
      }, {session});
      await session.commitTransaction()
      session.endSession()
      res.status(200).json({msg: "Successful transaction"});
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({msg: "Internal Server Error"})
  }
}

