import jwt from 'jsonwebtoken';
import generateTokens from '../utils/generateTokens.js';

export const tokenRefresh = (req, res, next) => {
    let { oldRefreshToken } = req.body.refreshToken;
    let decoded = null;
    if (!oldRefreshToken) {
        return res.status(401).json({ msg: 'Bad Request: No token provided' });
    }
    try {
        decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ msg: 'Bad Request: Invalid token' });
    }

    let tokensObj = generateTokens(req, decoded.email);

    res.status(200).json({msg: "Successfully refreshed tokens", ...tokensObj});
}