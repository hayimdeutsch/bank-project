import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
import generateTokens from "../utils/generateTokens.js";

export const loginAdmin = async (req, res) => {
  let {email, password} = req.body;
  let user = null;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({msg: "Access denied only admin can log in"})
  }

  try {
      user = await User.findById(email);
  } catch (err) {
      console.log(err);
      return res.status(500).json({msg: "Internal server error"})
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
      return res.status(400).json({msg: "Incorrect password"});
  }

  generateTokens(res, email);

  return res.status(200).json({msg: "Successful login"});
}

export const getUsersAutocomplete = async (req, res) => {
  try {
    const search = req.query.q;
    if (!search) {
      return res.status(400).json({ msg: "Search term is required" });
    }

    const results = await User.find(
      { _id: { $regex: `^${search}`, $options: 'i' } }
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
      res.status(200).json({msg: "Successful deposit"});
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    res.status(500).json({msg: "Internal Server Error"})
  } finally {
    session.endSession();
  }
}

