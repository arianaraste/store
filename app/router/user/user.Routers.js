const { AuthRouter } = require("./auth.router");

const router = require("express").Router();


router.use("/authentication",AuthRouter)

module.exports = {
    UserRouters  : router
}