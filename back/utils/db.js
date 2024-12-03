import mongoose from 'mongoose'
import User from "../models/userModel.js"
import PendingUser from '../models/pendingUserModel.js'
import Transaction from "../models/transactionModel.js";
import BankError from "./bankError.js";

export const addUser = async function (user) {
  const userInfo = 
  { 
    _id: user.email,
    ...user
  };
  let newUser = new User(userInfo);

  try {
    await newUser.validate(["_id"]);
  } catch(err) {
    throw new BankError("Email already taken", 409)
  }

  try {
    await newUser.validate();
  } catch(err) {
    throw new BankError("Invalid Input", 400);
  }

  try {
    await newUser.save();
  } catch (err) {
    throw new BankError("DB Error", 500);
  }
}

export const getUserByEmail = async function (email) {
  let user = null;

  try {
    user = await User.findOne({_id: email});    
  } catch (err) {
    throw new BankError("DB Error", 500);
  }
  
  return user;
};
  
export const getUserTransactionsByEmail = async function (email) {
  let userTransactions = null;
    try {
    userTransactions = await User.findById(email, "transactions -_id")
    .populate({
        path: 'transactions',
        select: 'from to amount time -_id',
        options: { getters: true },
    }).exec();
  } catch (err) {
    throw new BankError("DB Error", 500);
  }

  if (!userTransactions) {
    throw new BankError("Invalid Email", 400);
  }

  return userTransactions;
}

export const getAllUsers = async function () {
  try {
    const results = await User.find({ })
    .select({ transactions: 0})

    const users = results.map((doc) => ({
      email: doc._id,
      firstName: doc.firstName,
      lastName: doc.lastName,
      phone: doc.phone,
      balance: doc.balance,
    }));

    return users;
  } catch (err) {
    throw new BankError("DB Error", 500);
  }
}

export const postTransaction = async function (from, to, amount) {
    let transaction = new Transaction({ from, to, amount });

    let session = await mongoose.connection.startSession();
    try {
        session.startTransaction();
        await transaction.save({session});
        await User.findByIdAndUpdate(from, 
            {
                $inc : {balance : -amount}, 
                $push: {transactions: transaction._id}
            },{session});
        await User.findByIdAndUpdate(to, 
            {
                $inc : {balance : amount}, 
                $push: {transactions: transaction._id}
            }, {session});

        await session.commitTransaction()
    } catch (err) {
        await session.abortTransaction();
        throw new BankError("DB Error", 500);
    } finally {
        session.endSession()
    }
}

export const postDeposit = async function (user, amount) {
  const transaction = new Transaction({
    from: user,
    to: user,
    amount,
  });

  try {
    await transaction.validate();
  } catch(err) {
    throw new BankError("Invalid Input", 400);
  }

  let session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    await transaction.save({session});
    await User.findByIdAndUpdate(user, 
      {
          $inc : {balance : amount}, 
          $push: {transactions: transaction._id}
      }, {session});
      await session.commitTransaction()
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    throw new BankError("DB Error", 500);
  } finally {
    session.endSession();
  } 
}

export const addPendingUser = async function (user) {
  let newUser = new PendingUser({ _id: user.email, ...user });

  try {
    await newUser.validate();
  } catch(err) {
    throw new BankError("Invalid input", 400);
  }

  try {
    await newUser.save();
  } catch (err) {
    throw new BankError("DB Error", 500);
  }
}

export const getPendingUserByCode = async function (code) {
  let user = null;

  try {
    user = await PendingUser.findOne({confirmationCode: code});    
  } catch (err) {
    throw new BankError("DB Error", 500);
  }

  if (!user) {
    throw new BankError("Invalid code", 400);
  }
    
    return user;
};

export const getPendingUserByEmail = async function (email) {
  let user = null;

  try {
    user = await PendingUser.findById(email);    
  } catch (err) {
    throw new BankError("DB Error", 500);
  }

  if (!user) {
    throw new BankError("Invalid email", 400);
  }
    
    return user;
}

export const deletePendingUserByCode = async function (code) {
  let deleted = null;
  try {
    deleted = await PendingUser.deleteOne({confirmationCode: code});
  } catch (err) {
    throw new BankError("DB Error", 500)
  }

  if (deleted.deletedCount == 0) {
    throw new BankError("Invalid Code", 400)
  }
}

export const updatePendingUserByEmail = async function (email, update) {
  let user = null;
  try {
    user = await PendingUser.findByIdAndUpdate( email, 
      {
          $set: update
      }
    )
  } catch (err) {
    throw new BankError("DB Error", 500)
  }

  if (!user) {
    throw new BankError("User not found", 400);
  }
}

export const checkIfEmailTaken = async function (email) {
  try {
    const existingUser = await User.findById(email);
    const existingPendingUser = await PendingUser.findById(email);
    return (existingUser || existingPendingUser);
  } catch (err) {
    throw new BankError("DB Error", 500)
  }
}