const config = require("../config/config");
const { userService } = require("../services");
const { verifyToken } = require("../utils/token.util");
const apiResponse = require("../dtos/apiResponse");
const { generateVerifyToken, isTokenBlacklisted } = require("../utils/token.util");
exports.auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer "))
    return apiResponse.notFoundResponse(res, "Authorization");
  try {
    const token = authorization.split(" ")[1];
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return apiResponse.ErrorResponse(res, "token is blacklisted");
    }
    const { id } = verifyToken(token, config.ACCESS_TOKEN_SECRET);
    if (!id) return apiResponse.notFoundResponse(res, "Invalid token");

    const user = await userService.findOneById(id);
    if (!user || user.verified === false)
      return apiResponse.notFoundResponse(res, "Invalid user");

    req.user = user;
    req.id = id;
    next();
  } catch (err) {
    console.error(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};

