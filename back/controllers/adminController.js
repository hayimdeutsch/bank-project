import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
import generateTokens from "../utils/generateTokens.js";
import { getAllUsers, getUserByEmail, postDeposit } from "../utils/db.js";
import BankError from "../utils/bankError.js";

export const loginAdmin = async (req, res, next) => {
  let {email, password} = req.body;
  let user = null;

  if (email !== process.env.ADMIN_EMAIL) {
    next(new BankError("Access denied - only admin can log in", 403))
  }

  try {
    user = await getUserByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BankError("Incorrect password", 400)
    }
    
    let tokens = generateTokens(res, email);
    return res.status(200).json({msg: "Successful login", ...tokens});

  } catch (err) {
    next(err);
  }

  // let {email, password} = req.body;
  // let user = null;

  // if (email !== process.env.ADMIN_EMAIL) {
    
  //   return res.status(403).json({msg: "Access denied only admin can log in"})
  // }

  // try {
  //     user = await User.findById(email);
  // } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({msg: "Internal server error"})
  // }
  
  // const match = await bcrypt.compare(password, user.password);
  // if (!match) {
  //     return res.status(400).json({msg: "Incorrect password"});
  // }

  // let tokens = generateTokens(res, email);

  // return res.status(200).json({msg: "Successful login", ...tokens});
}

export const getUsers = async (req, res, next) => {
  try {
    const search = req.query.q;
    if (!search) {
      throw new BankError("Search term is required", 400);
    }

    const users = await getAllUsers(search);

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
  // try {
  //   const search = req.query.q;
  //   if (!search) {
  //     return res.status(400).json({ msg: "Search term is required" });
  //   }

  //   const results = await User.find(
  //     { _id: { $regex: `^${search}`, $options: 'i' } }
  //   )
  //   .limit(10)
  //   .select({ _id: 1 })
  //   .lean();

  //   const users = results.map((doc) => ({ email: doc._id }));

  //   res.status(200).json(users);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ msg: "Internal server error" });
  // }
}

export const postUserDeposit = async (req, res, next) => {
  const { email, amount } = req.body;
 
  if (!email || !amount) {
    next(new BankError("Missing fields", 400));
  }

  try {
    const user = getUserByEmail(email);
    if (!user) {
      throw new BankError("User not found", 400);
    }
    await postDeposit(user);
    res.status(200).json({success: true, msg: "Successful deposit"})
  } catch (err) {
    next(err);
  }

  // const transaction = new Transaction({
  //   from: email,
  //   to: email,
  //   amount,
  // });

  // let session = await mongoose.connection.startSession();
  // try {
  //   session.startTransaction();
  //   await transaction.save({session});
  //   await User.findByIdAndUpdate(email, 
  //     {
  //         $inc : {balance : amount}, 
  //         $push: {transactions: transaction._id}
  //     }, {session});
  //     await session.commitTransaction()
  //     res.status(200).json({msg: "Successful deposit"});
  // } catch (err) {
  //   console.log(err);
  //   await session.abortTransaction();
  //   res.status(500).json({msg: "Internal Server Error"})
  // } finally {
  //   session.endSession();
  // }
}

export const logoutAdmin = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({msg: "Successfully logged out"});
}
