const homeControllers = require("../../http/controller/api/homeControllers");

const router = require("express").Router();
router.use("/" , homeControllers.indexpage)
module.exports = {
    HomeRoutes : router
}