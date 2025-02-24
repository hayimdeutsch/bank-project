import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BankError from "./bankError.js";
import { expirationTime } from "../config.js";
import { generateRegistrationToken } from "./generateTokens.js";
import { sendConfirmationCode } from "./sendEmail.js";
import { addPendingUser, updatePendingUserByEmail } from "./db.js";

function checkIfCodeExpired(pendingUser) {
  return pendingUser.expiration < Date.now();
}

async function hashPassword(password) {
  let salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

function calculateExpirationTime() {
  let exp = Date.now() + expirationTime;
  return exp;
}

function generateConfirmationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createPendingUser(newUser) {
  newUser.password = await hashPassword(newUser?.password);
  newUser.expiration = calculateExpirationTime();
  newUser.confirmationCode = generateConfirmationCode();
  await addPendingUser(newUser);
  const token = sendConfirmationCode(newUser.email, newUser.confirmationCode);
  return generateRegistrationToken(newUser.email);
}

async function extendUserExp(email) {
  try {
    const extendedExpTime = calculateExpirationTime();
    const otp = generateConfirmationCode();
    const update = { expiration: extendedExpTime, confirmationCode: otp };
    await updatePendingUserByEmail(email, update);
    sendConfirmationCode(email, otp);
    const token = generateRegistrationToken(email);
    return token;
  } catch (error) {
    throw new BankError("Error extending user expiration time", 500, error);
  }
}

async function verifyRegistrationToken(token) {
  try {
    const verifiedUser = jwt.verify(
      token,
      process.env.REGISTRATION_TOKEN_SECRET
    );
    return verifiedUser;
  } catch (error) {
    throw new BankError("Invalid or expired token", 401, error);
  }
}

export {
  checkIfCodeExpired,
  hashPassword,
  calculateExpirationTime,
  generateConfirmationCode,
  createPendingUser,
  extendUserExp,
  verifyRegistrationToken,
};
