import fs from 'fs';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import PendingUser from '../models/pendingUserModel.js';

export const signUp = async (req, res) => {
    let existingUser = await User.exists({_id: req.body.email});
    if (existingUser) {
        return res.status(409).json({msg: "Email taken"});
    }
    try {
        let confirmationCode = await initNewUser(req, res);
        res.status(202).json({msg: "User Added Successfully", confirmationCode });
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Internal server error"})
    }
}

export const confirmActivation = async (req, res) => {
    let code = req.body.confirmationCode;
    let pendingUser = await PendingUser.findById(code);
    if (!pendingUser) {
        return res.status(400).json({msg: "Wrong activation code"});
    }

    let userEmail = pendingUser.email;

    if (pendingUser.expiration < Date.now()) {
        return res.status(400).json({msg: "Activation code expired"})
    }
    try {
        await User.updateOne({_id: userEmail}, {activated: true});
        await PendingUser.deleteOne({_id: code});
    } catch (err) {
        res.status(500).json({msg: err.msg})
    }

    res.status(200).json({msg: "Account Confirmed"});
}

async function initNewUser(req) {
    let {firstName, lastName, email, phone, password } = req.body;
    let hashedPassword = await hashPassword(password);
    let user = new User({_id: email, firstName, lastName, phone, password: hashedPassword});
    await user.save();
    let otp = generateConfirmationCode();
    let pendingUser = new PendingUser({_id: otp, email});
    await pendingUser.save();
    return otp;
}

async function hashPassword(password) {
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

function generateConfirmationCode(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}