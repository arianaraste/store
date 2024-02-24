const { UserAuthController } = require("../../http/controller/user/auth.controller");

const router = require("express").Router();

router.use("/login" , UserAuthController.login);

module.exports = {
    AuthRouter : router
}