const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
    MONGODB_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    PORT: parseInt(process.env.PORT, 10) || 8080,
    SECRET_KEY: process.env.SECRET_KEY,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    APP_URL: process.env.APP_URL,
    VERIFY_TOKEN_SECRET: process.env.VERIFY_TOKEN_SECRET,
    JWT_ACCESS_EXPIRATION_SECONDS: process.env.JWT_ACCESS_EXPIRATION_SECONDS,
};