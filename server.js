require("dotenv").config();
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

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
    }

    configureRoutes() {
        this.app.use("/", routes);
    }

    startServer() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server started at Port ${this.port}`);
        });
    }
}

const server = new ExpressServer();
