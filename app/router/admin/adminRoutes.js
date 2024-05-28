const { blogRoutes } = require("./blogsRoutes");
const {categoryRoutes} = require("./categoryRoutes");
const { courseRouter } = require("./courseRouter");
const { productRoutes } = require("./product.router");

const router = require("express").Router();
 /**
 * 
 * 
 * @swagger
 * 
 * tags:
 *  -   name: Amin-Panel
 *      description: all routes for adminPanel Api
 *  -   name: Course
 *      description: all routes for coursePanel Api
 *  -   name: Product
 *      description:    all routes of product Api
 *  -   name : Category
 *      description : all routes of Category Api
 *  -   name : blogs
 *      description:  all routes of blog Api
 * 
 * 
 */
router.use("/category",categoryRoutes);
router.use("/blog" , blogRoutes);
router.use("/product", productRoutes);
router.use("/course", courseRouter);

module.exports = {
    AdminRoutes : router
}