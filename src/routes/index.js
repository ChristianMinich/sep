const express = require("express");
const router = new express.Router();
const adminRouter = require("./adminRouter");
const apiRouter = require("./apiRouter");
const authRouter = require("./authRouter");
const storeDetailsController = require("../controllers/storeDetailsController");
const mw = require("../middlewares");

/**
 * Express router for managing various routes.
 * @type {express.Router}
 */
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/storeDetails", storeDetailsController.storeDetails);

/**
 * Mounts the admin router under the "/admin" path.
 * @memberof router
 * @name adminRouter
 * @type {express.Router}
 */
router.use("/admin", adminRouter);

/**
 * Mounts the API router under the "/api" path.
 * @memberof router
 * @name apiRouter
 * @type {express.Router}
 */
router.use("/api", mw.authenticateToken, apiRouter);

/**
 * Mounts the authentication router under the "/auth" path.
 * @memberof router
 * @name authRouter
 * @type {express.Router}
 */
router.use("/auth", authRouter);

module.exports = router;
