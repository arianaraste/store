const {UserRouters} = require("./user/user.Routers");
const {AdminRoutes } = require("./admin/adminRoutes");
const { IndexRoutes } = require("./api/Allindex.Routes");
const { DeveloperRoutes } = require("./Developer/developer.routers");


const router = require("express").Router();
console.log("test ROutesFile");
router.use("/",IndexRoutes);
router.use("/DeveloperRoutes", DeveloperRoutes);
router.use("/Admin",AdminRoutes);
router.use("/User",UserRouters);


module.exports = {
    AllRoutes : router
}