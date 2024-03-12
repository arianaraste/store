const {blogsController} = require("../../http/controller/admin/blogs.controller");

const router = require("express").Router();
/**
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/blog/get-all-blogs:
 *          get:
 *              tags: [blogs]
 *              summary: blogs
 *              description: get all blogs
 *              responses:
 *                  200:   
 *                      description: succses
 */

router.use("/get-all-blogs", blogsController.getAllBlog)
module.exports = {
    blogRoutes : router
}