import jwt from 'jsonwebtoken';

const generateTokens = function (email) {
  const accessToken = jwt.sign({"email": email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({"email": email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '3h'});

  return ( { accessToken, refreshToken } );
}

export default generateTokens;