import { body } from "express-validator"
import sendMissingFieldErrors from "./sendMissingFieldErrors.js";

export const loginValidator = [
    body('email', 'Email not provided').isEmail(),
    body('password', 'Missing password field').notEmpty(),
    body('password', 'The minimum password length is 6 characters')
        .isLength({min: 6}), 
    sendMissingFieldErrors,
];

export const signUpValidator = [
    body('firstName', 'Missing first name').notEmpty().trim(),
    body('lastName', 'Missing last name').notEmpty().trim(),
    body('email', 'Invalid email').isEmail().trim(),
    body('phone', 'Incorrect phone format').isMobilePhone(),
    body('password', 'The minimum password length is 6 characters')
                                                            .isLength({min: 6}),
    sendMissingFieldErrors,
];

export const sendTransactionValidator = [
    body('to', 'Missing recipient email').notEmpty(),
    body('to', 'Recipient not in email format').isEmail(),
    body('amount').notEmpty().isNumeric(),
    sendMissingFieldErrors,
];

