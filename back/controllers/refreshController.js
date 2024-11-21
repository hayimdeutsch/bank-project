import jwt from 'jsonwebtoken';

export const tokenRefresh = (req, res, next) => {
    let { oldRefreshToken } = req.body;
    let decoded = null;
    try {
        decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    let emailObj = { "email": decoded.email};
    const accessToken = jwt.sign( emailObj , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'});
    const refreshToken = jwt.sign( emailObj , process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3h'});
    res.status(200).json({accessToken, refreshToken});
}