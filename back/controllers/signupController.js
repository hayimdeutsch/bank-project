import bcrypt from 'bcrypt';
import BankError from '../utils/bankError.js';
import { expirationTime } from '../config.js';
import { sendConfirmationCode } from '../utils/sendEmail.js';
import { 
    checkIfEmailTaken, 
    addPendingUser, 
    deletePendingUserByEmail,
    addUser,
    getPendingUserByEmail,
    updatePendingUserByEmail
} from '../utils/db.js';

export const signUp = async (req, res, next) => {
    try {
        let newUser = {...req.body};
        const isTaken = await checkIfEmailTaken(newUser.email);
        if (isTaken) {
            throw new BankError("Email already taken", 409);
        }
        
        newUser.password = await hashPassword(newUser?.password);
        newUser.expiration = calculateExpirationTime();
        newUser.confirmationCode = generateConfirmationCode();

        await addPendingUser(newUser)
        sendConfirmationCode(newUser.email, newUser.confirmationCode);
        res.status(202).json({
            success: true,
            message: "User Added Successfully", 
        });
    } catch (error) {
        next(error);
    }
}

export const confirmActivation = async (req, res, next) => {
    try {
        const pendingUser = await getPendingUserByEmail(req.body.email);
        
        if (!pendingUser) {
            throw new BankError("Registration time expired", 410);
        }

        if (pendingUser.confirmationCode !== req.body.confirmationCode) {
            throw new BankError("Incorrect code", 400);
        }

        const isCodeExpired =  checkIfCodeExpired(pendingUser);
        if (isCodeExpired) {
            throw new BankError("Confirmation code expired", 403);
        }

        let {_id : email, firstName, lastName, phone, password } = pendingUser;
        await addUser({email, firstName, lastName, phone, password});
        await deletePendingUserByEmail(req.body.email);
        res.status(202).json({message: "Account cofirmed", success: true})
    } catch (error) {
        next(error);
    }
}

export const resendActivation = async (req, res, next) => {
    try {
        const { email }  = req.body;
        const pendingUser = await getPendingUserByEmail(email);
        if (!pendingUser) {
            throw new BankError("Registration time expired", 410);
        }

        const extendedExpTime = calculateExpirationTime();
        const otp = generateConfirmationCode();
        const update = { expiration: extendedExpTime, confirmationCode: otp };
        await updatePendingUserByEmail(email, update)
        sendConfirmationCode(email, otp);
        res.status(200).json({
            success: true,
            message: "Confirmation code resent"
        });
    } catch (err) {
        next(err)
    }
}

export const cancelRegistration = async (req, res, next) => {
    try {
        console.log(req?.body);
        await deletePendingUserByEmail(req.body.email);
        res.status(200).json({success: true, message: "Registration Cancelled"});
    } catch (err) {
        next(err);
    }
}

function checkIfCodeExpired(pendingUser) {
    return (pendingUser.expiration < Date.now());
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