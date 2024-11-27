import jwt from 'jsonwebtoken';

const authenticateAccessToken = (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({msg: "No token provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export default authenticateAccessToken;
