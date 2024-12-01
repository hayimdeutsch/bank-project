import jwt from 'jsonwebtoken';
import { accessTokenExpiration, refreshTokenExpiration } from '../config.js';

const generateTokens = function (res, email) {
  const accessToken = jwt.sign(
    {"email": email}, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: accessTokenExpiration }
  );

  const refreshToken = jwt.sign(
    {"email": email}, 
    process.env.REFRESH_TOKEN_SECRET, 
    {expiresIn: refreshTokenExpiration }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });
  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  })
  return ({ accessToken, refreshToken });
}

export default generateTokens;