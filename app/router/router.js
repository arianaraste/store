const { HomeRoutes } = require("./api");
const {AuthRouter} = require("./user/auth.router");


const router = require("express").Router();
router.use("/User" , AuthRouter)
router.use("/" , HomeRoutes)

module.exports = {
    AllRoutes : router
}