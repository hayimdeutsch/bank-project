import bcrypt from "bcrypt";

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
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export const postUserDeposit = async (req, res, next) => {
  try {
    const { user, amount } = req.body;
   
    if (!user || !amount) {
      throw new BankError("Missing fields", 400);
    }

    let userObj = await getUserByEmail(user);
    if (!userObj) {
      throw new BankError("User not found", 400);
    }

    await postDeposit(user, amount);
    res.status(200).json({success: true, msg: "Successful deposit"})
  } catch (err) {
    next(err);
  }
}

export const logoutAdmin = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({msg: "Successfully logged out"});
}
