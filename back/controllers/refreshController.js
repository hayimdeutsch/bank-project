import jwt from 'jsonwebtoken';
import generateTokens from '../utils/generateTokens.js';

export const tokenRefresh = (req, res, next) => {
    let { refreshToken } = req.body;
    let decoded = null;
    if (!refreshToken) {
        return res.status(401).json({ msg: 'Bad Request: No token provided' });
    }
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ msg: 'Bad Request: Invalid token' });
    }

    let tokensObj = generateTokens(res, decoded.email);

    res.status(200).json({msg: "Successfully refreshed tokens", ...tokensObj});
}