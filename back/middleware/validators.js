import { body, validationResult } from "express-validator"

export const loginValidator = [
    body('email', 'Email not provided').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Missing password field').notEmpty(),
    body('password', 'The minimum password length is 6 characters')
        .isLength({min: 6}), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        next();
    },
];

export const signUpValidator = [
    body('firstName', 'Missing first name').notEmpty().trim(),
    body('lastName', 'Missing last name').notEmpty().trim(),
    body('email', 'Email not provided').notEmpty().trim(),
    body('email', 'Invalid email').isEmail(),
    body('phone', 'Missing phone field').notEmpty(),
    body('phone', 'Incorrect phone format').isMobilePhone(),
    body('password', 'Missing password field').notEmpty(),
    body('password', 'The minimum password length is 6 characters')
        .isLength({min: 6}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        next();
    },
];

export const sendTransactionValidator = [
    body('to', 'Missing recipient email').notEmpty(),
    body('to', 'Recipient not in email format').isEmail(),
    body('amount').notEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        next();
    },
]

