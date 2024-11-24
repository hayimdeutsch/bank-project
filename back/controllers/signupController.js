import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import PendingUser from '../models/pendingUserModel.js';
import { sendConfirmationCode } from '../utils/sendEmail.js';
import { expirationTime } from '../config.js';

export const signUp = async (req, res) => {
    let { email } = req.body;
    let isExistingUser = await User.exists({_id: email});
    let isPendingUser = await PendingUser.exists({_id: email});

    if (isExistingUser || isPendingUser) {
        return res.status(409).json({msg: "Email taken"});
    }

    try {
        let confirmationCode = await initNewUser(req, res);
        sendConfirmationCode(email, confirmationCode);
        res.status(202).json({msg: "User Added Successfully", confirmationCode });
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Internal server error"})
    }
}

export const confirmActivation = async (req, res) => {
    let code = req.body.confirmationCode;
    let pendingUser = await PendingUser.findOne({confirmationCode: code});
    if (!pendingUser) {
        return res.status(400).json({msg: "Wrong activation code"});
    }
    
    if (pendingUser.expiration < Date.now()) {
        await PendingUser.deleteOne({confirmationCode: code});
        return res.status(400).json({msg: "Activation code expired"})
    }

    let newUser = new User({
        _id: pendingUser._id, 
        firstName: pendingUser.firstName,
        lastName: pendingUser.lastName,
        phone: pendingUser.phone,
        password: pendingUser.password   
    });

    try {
        await PendingUser.deleteOne({confirmationCode: code});
        await newUser.save();
    } catch (err) {
        res.status(500).json({msg: err.msg})
    }

    res.status(200).json({msg: "Account Confirmed"});
}

export const resendActivation = async (req, res) => {
    const email = req.body.email;
    let pendingUser = await PendingUser.findById(email);
    if (!pendingUser) {
        return res.status(400).json({msg: "Wrong activation code"});
    }

    if (pendingUser.expiration < Date.now()) {
        await PendingUser.deleteOne({confirmationCode: code});
        return res.status(400).json({msg: "Activation code expired"})
    }

    const extendedExpTime = calculateExpirationTime();
    const otp = generateConfirmationCode();
    sendConfirmationCode(email, otp);
    console.log(email, extendedExpTime, otp)
    try {
        await PendingUser.findByIdAndUpdate( email, 
            {
                $set: {
                    confirmationCode: otp,
                    expiration: extendedExpTime
                }
            }
        );
        res.status(200).json({msg: "Confirmation code resent", confirmationCode: otp})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: err.msg})
    }
}

async function initNewUser(req) {
    let {firstName, lastName, email, phone, password } = req.body;
    let hashedPassword = await hashPassword(password);
    let otp = generateConfirmationCode();
    let exp = calculateExpirationTime();
    console.log(exp);
    let newPendingUser = new PendingUser({
        _id: email, 
        confirmationCode: otp, 
        firstName, 
        lastName, 
        phone,
        expiration: exp,
        password: hashedPassword
    });
    await newPendingUser.save();
    return otp;
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

function generateConfirmationCode(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}