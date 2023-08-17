const AbstractController = require("./abstractController");
const path = require("path");

/**
 * Controller for admin routes.
 * @date 8/12/2023 - 11:04:36 PM
 *
 * @class AdminController
 * @typedef {AdminController}
 */
class AdminController extends AbstractController{
    constructor(){
        super();
    }

    index(req, res){
        res.status(200).sendFile(path.resolve("public/index.html"));
    }

    createStore(req, res){
        res.status(200).sendFile(path.resolve("public/createStore.html"));
    }

    storeDetails(req, res){
        res.status(200).sendFile(path.resolve("public/storeDetails.html"));
    }

    allOrders(req, res){
        res.status(200).sendFile(path.resolve("public/allOrders.html"));
    }

    placeOrder(req, res){
        res.status(200).sendFile(path.resolve("public/placeOrder.html"));
    }

    login(req, res){
        res.status(200).sendFile(path.resolve("public/login.html"));
    }

    getSettings(req, res){
        res.status(200).sendFile(path.resolve("public/getSettings.html"));
    }

    setSettings(req, res){
        res.status(200).sendFile(path.resolve("public/setSettings.html"));
    }

}   

module.exports = new AdminController();