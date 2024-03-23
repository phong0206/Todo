'use strict';
const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const config = require("./config/config");
const { limiter } = require('./middlewares/rate.limiter.middleware')

const swaggerUi = require("swagger-ui-express");
const { specs } = require("./config/swagger.config");

const ConfigMongo = require("./config/mongo.config");
const redisClient = require('./config/redis.config');

const app = express();

const startServer = () => {
    ConfigMongo.connectDatabase();

    redisClient.connect().then(() => {
        console.log('Redis connected!');
    });
    const corsOptions = {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionSuccessStatus: 200,
    };
    //set security HTTP headers
    app.use(helmet());

    app.use(cookieParser());
    app.use(cors(corsOptions));

    //parse json body params
    app.use(express.json());

    // sanitize request data
    app.use(xss());
    app.use(mongoSanitize());

    //limit req
    app.use(limiter)

    app.use("/", routes);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.listen(config.PORT, () => {
        console.log("listening on port 3000");
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Có lỗi xảy ra!');
    });
}
startServer()
