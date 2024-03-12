const {categoryRoutes} = require("./categoryRoutes");

const router = require("express").Router();
 /**
 * 
tion : all routes of Category
 * 
 * @swagger
 * 
 * tags:
 *  -   name: Amin-Panel
 *      description: all routes for adminPanel
 *  -   name : Category
 *      description : all routes of Category
 * 
 * 
 */
router.use("/category",categoryRoutes);

module.exports = {
    AdminRoutes : router
}