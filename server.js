require("dotenv").config();
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const logger = require("./src/utils/logger");
class ExpressServer {
    constructor() {
        this.app = express();
        this.httpServer = http.Server(this.app);
        this.port = process.env.PORT;

        this.configureMiddleware();
        this.configureRoutes();
        this.startServer();
    }

    configureMiddleware() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static("public", { extensions: ["html"] }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json({ limit: '500mb' }));

        this.app.use((req, res, next) => {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            next();
        });
    }

    configureRoutes() {
        this.app.use("/", routes);
    }

    startServer() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server started at Port ${this.port}`);
            logger.info(`Server started at Port ${this.port}`);

            /* show Memory usage */
            /* setInterval(() => {
                logger.memory("Memory usage");
            }, 1000); */
        });
    }
}

const server = new ExpressServer();