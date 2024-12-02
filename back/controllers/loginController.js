import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateTokens.js';
import BankError from '../utils/bankError.js';
import { getUserByEmail } from '../utils/db.js';

export const logIn = async (req, res, next) => {   
    try {
        let {email, password} = req.body;
        const user = await getUserByEmail(email);

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new BankError("Incorrect password", 400);
        }

        let tokens = generateTokens(res, email);

        return res.status(200).json(
            {
                msg: "Successful login",
                 ...tokens,
                  success: true
            }
        );
    } catch (err) {
        next(err);
    }
}

export const logOut = async (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({msg: "Successfully logged out"});
}
