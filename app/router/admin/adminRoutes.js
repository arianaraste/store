const {categoryRoutes} = require("./categoryRoutes");

const router = require("express").Router();
 
router.use("/Category",categoryRoutes);

module.exports = {
    AdminRoutes : router
}