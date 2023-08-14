const express = require("express");
const app = express();
const http = require("http").Server(app);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public", {extensions: ["html"]}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '500mb' }));

const routes = require("./src/routes");
app.use("/", routes);

http.listen(8080, () => {
    console.log("Server started at Port 8080");
});
