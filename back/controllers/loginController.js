import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const logIn = async (req, res) => {
    let {email, password} = req.body;
    
    let user = await User.findById(email);
    if (!user) {
        return res.status(400).json({msg: "Incorrect Username"});
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({msg: "Incorrect password"});
    }

    if (!user.activated) {
        return res.status(400).json({msg: "User not activated"});
    }
    let tokens = generateTokens(email);

    return res.status(200).json(tokens);
}

function generateTokens(email) {
    const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '3h'});

    return ( { accessToken, refreshToken } );
}
