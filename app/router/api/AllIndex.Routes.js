const { HomeRoutes } = require("./IndexHome.Router");

const router = require("express").Router();

router.use(HomeRoutes);

module.exports = {
    IndexRoutes : router
}