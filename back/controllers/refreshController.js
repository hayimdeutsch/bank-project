import jwt from 'jsonwebtoken';
import generateTokens from '../utils/generateTokens.js';

export const tokenRefresh = (req, res, next) => {
    let { oldRefreshToken } = req.body;
    let decoded = null;

    try {
        decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    let tokensObj = generateTokens(decoded.email);

    res.status(200).json(tokensObj);
}