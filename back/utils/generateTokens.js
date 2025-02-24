import jwt from "jsonwebtoken";
import {
  codeExpiryMins,
  accessTokenExpiration,
  refreshTokenExpiration,
} from "../config.js";

export function generateRegistrationToken(email) {
  return jwt.sign({ email: email }, process.env.REGISTRATION_TOKEN_SECRET, {
    expiresIn: codeExpiryMins * 60,
  });
}

export function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiration,
  });
}

export function generateRefreshToken(email) {
  return jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiration,
  });
}

const generateTokens = function (email) {
  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);

  return { accessToken, refreshToken };
};

export default generateTokens;
