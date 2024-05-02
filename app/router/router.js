const {UserRouters} = require("./user/user.Routers");
const {AdminRoutes } = require("./admin/adminRoutes");
const { IndexRoutes } = require("./api/Allindex.Routes");
const { DeveloperRoutes } = require("./Developer/developer.routers");
const { verifyaccsesToken } = require("../http/middlewares/verifyAccsesToken");
const { checkRole } = require("../http/middlewares/checkRole");


const router = require("express").Router();
router.use("/",IndexRoutes);
router.use("/developer-router", DeveloperRoutes);
router.use("/admin",verifyaccsesToken,checkRole("ADMIN"),AdminRoutes);
router.use("/User",UserRouters);


module.exports = {
    AllRoutes : router
}