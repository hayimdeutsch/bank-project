import BankError from "../utils/bankError.js";
import {
  deletePendingUserByEmail,
  addUser,
  getPendingUserByEmail,
  getUserByEmail,
} from "../utils/db.js";
import {
  checkIfCodeExpired,
  createPendingUser,
  extendUserExp,
  verifyRegistrationToken,
} from "../utils/userUtils.js";

const signUp = async (req, res, next) => {
  try {
    const { email, token } = req.body;

    const verifiedUser = await getUserByEmail(email);
    if (verifiedUser) {
      throw new BankError("Email already taken", 409);
    }

    if (token) {
      try {
        const pendingUser = await verifyRegistrationToken(token);
        await deletePendingUserByEmail(pendingUser.email);
        const newToken = await createPendingUser(req.body);
        return res.status(200).json({
          success: true,
          message: "Confirmation code resent",
          token: newToken,
        });
      } catch (err) {
        if (err.code !== 401) {
          console.log(err);
          throw new BankError(
            err.msg || "Error Extending User Expiration Time",
            err.code || 500,
            err.cause || err
          );
        }
      }
    }

    const existingUser = await getPendingUserByEmail(email);
    if (existingUser) {
      const isExpired = checkIfCodeExpired(existingUser);
      if (!isExpired) {
        throw new BankError("Email already taken", 409);
      }
      deletePendingUserByEmail(existingUser);
    }

    const newToken = await createPendingUser(req.body);
    res.status(202).json({
      success: true,
      message: "User Added Successfully",
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
};

const confirmActivation = async (req, res, next) => {
  try {
    const { confirmationCode, token } = req.body;
    const verifiedUser = await verifyRegistrationToken(token);
    if (!verifiedUser) {
      throw new BankError("Invalid or expired token", 401);
    }
    const email = verifiedUser.email;

    const pendingUser = await getPendingUserByEmail(email);

    if (pendingUser.confirmationCode !== confirmationCode) {
      throw new BankError("Incorrect code", 400);
    }

    const { firstName, lastName, phone, password } = pendingUser;
    await addUser({ email, firstName, lastName, phone, password });
    await deletePendingUserByEmail(email);
    res.status(202).json({ message: "Account cofirmed", success: true });
  } catch (error) {
    next(error);
  }
};

const resendActivation = async (req, res, next) => {
  try {
    const { token } = req.body;
    const verifiedUser = await verifyRegistrationToken(token);
    if (!verifiedUser) {
      throw new BankError("Invalid or expired token", 401);
    }
    const newToken = await extendUserExp(verifiedUser.email);
    res.status(200).json({
      success: true,
      message: "Confirmation code resent",
      token: newToken,
    });
  } catch (err) {
    next(err);
  }
};

export { signUp, confirmActivation, resendActivation };
