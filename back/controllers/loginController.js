import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateTokens from '../utils/generateTokens.js';

export const logIn = async (req, res) => {
    let {email, password} = req.body;
    let user = null;

    try {
        user = await User.findById(email);
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Internal server error"})
    }
    if (!user) {
        return res.status(400).json({msg: "Incorrect Username"});
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({msg: "Incorrect password"});
    }

    generateTokens(res, email);

    return res.status(200).json({msg: "Successful login"});
}

export const logOut = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({msg: "Successfully logged out"});
}
