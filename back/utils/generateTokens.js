import jwt from 'jsonwebtoken';

const generateTokens = function (res, email) {
  const accessToken = jwt.sign(
    {"email": email}, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '1m' }
  );

  const refreshToken = jwt.sign(
    {"email": email}, 
    process.env.REFRESH_TOKEN_SECRET, 
    {expiresIn: '3h'}
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