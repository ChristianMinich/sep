const express = require("express");
const router = express.Router();
const adminRouter = require("./adminRouter");
const apiRouter = require("./apiRouter");
const authRouter = require("./authRouter");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use("/admin", adminRouter);
router.use("/api", apiRouter);
router.use("/auth", authRouter);

module.exports = router;