const {UserRouters} = require("./user/user.Routers");
const {AdminRoutes } = require("./admin/adminRoutes");
const { IndexRoutes } = require("./api/Allindex.Routes");
const { DeveloperRoutes } = require("./Developer/developer.routers");


const router = require("express").Router();
router.use("/",IndexRoutes);
router.use("/developer-router", DeveloperRoutes);
router.use("/admin",AdminRoutes);
router.use("/User",UserRouters);


module.exports = {
    AllRoutes : router
}