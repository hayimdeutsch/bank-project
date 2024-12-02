import BankError from '../utils/bankError.js';
import { 
    getUserByEmail, 
    getUserTransactionsByEmail, 
    postTransaction 
} from '../utils/db.js';

export const getInfo = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email);
        let userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user._id,
            phone: user.phone
        };
        res.status(200).json({
            success: true, 
            userInfo
        });
    } catch (err) {
        next(err);
    }
}

export const getBalance = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email);
        res.status(200).json({
            success: true, 
            balance: user.balance
        });
    } catch (err) {
        next(err);
    }
}

export const getTransactions = async (req, res, next) => {
    try {
        let userTransactions = await getUserTransactionsByEmail(req.body.email)
        res.status(200).json({
            success: true, 
            transactions: userTransactions.transactions
        });
    } catch(err) {
        next(err);
    }
}

export const postTransactions = async (req, res, next) => {
    try {
        let { email:from, to, amount } = req.body;

        if (from === to) {
            throw new BankError("Can't send money to yourself", 400);
        }

        const fromUser = await getUserByEmail(from);
        const toUser = await getUserByEmail(to);

        if (!toUser) {
            throw new BankError("Recipient not found", 400);
        }

        if (fromUser.balance < amount) {
            throw new BankError("Insufficient funds", 400);
        }
        await postTransaction(from, to, amount);
        res.status(200).json({
            success: true,
            msg: "Successful transaction"
        });
    } catch (err) {
        next(err);
    }
}
