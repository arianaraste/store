const { AuthRouter } = require("./auth.router");

const router = require("express").Router();


router.use("/Authentication",AuthRouter)

module.exports = {
    UserRouters  : router
}