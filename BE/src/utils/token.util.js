const jwt = require("jsonwebtoken");
const config = require("../config/config");
const uuid = require('uuid');
const redisClient = require('../config/redis.config');
exports.generateAccessToken = (id, expire = config.JWT_ACCESS_EXPIRATION_SECONDS, key = config.ACCESS_TOKEN_SECRET) => {
  try {
    const jwtPayload = {
      id: id,
      jti: uuid.v4(),
    };
    return jwt.sign(
      jwtPayload,
      key,
      {
        expiresIn: expire
      },
      {
        algorithm: "RS256"
      }
    );
  } catch (err) {
    console.error("Error generating token:", err);
  }
};



exports.verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.error("Error verifying token:", err);
  }
};


exports.blacklistToken = async (token) => {
  try {
    const { jti } = jwt.decode(token);
    if (jti) {
      // EX đã được đặt làm tham số trong hàm set
      await redisClient.set(`blacklist: ${ jti }`, 'true', { EX: config.ACCESS_TOKEN_SECRET_EXPIRATION });
      return true;
    } else {
      throw new Error('Invalid token - unable to extract JTI.');
    }
  } catch (error) {
    throw new Error('Error blacklisting token: ' + error.message);
  }
};

exports.isTokenBlacklisted = async (token) => {
  try {
    const { jti } = jwt.decode(token);
    if (jti) {
      const isBlacklisted = await redisClient.get(`blacklist: ${ jti }`);
      return isBlacklisted === 'true';
    } else {
      throw new Error('Invalid token - unable to extract JTI.');
    }
  } catch (error) {
    throw new Error('Error checking if token is blacklisted: ' + error.message);
  }
};
