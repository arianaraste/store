const { blogRoutes } = require("./blogsRoutes");
const {categoryRoutes} = require("./categoryRoutes");

const router = require("express").Router();
 /**
 * 
 * 
 * @swagger
 * 
 * tags:
 *  -   name: Amin-Panel
 *      description: all routes for adminPanel
 *  -   name : Category
 *      description : all routes of Category
 *  -   name : blogs
 *      description:  all routes of blog
 * 
 * 
 */
router.use("/category",categoryRoutes);
router.use("/blog" , blogRoutes)

module.exports = {
    AdminRoutes : router
}