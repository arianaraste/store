const {blogsController} = require("../../http/controller/admin/blogs.controller");
const { uploadFile } = require("../../utills/multer");
const {stringToArray} = require("../../http/middlewares/stringToArray")
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

router.get("/get-all-blogs", blogsController.getAllBlog)
/**
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/blog/create-blog:
 *          post:
 *              tags: [blogs]
 *              summary: create blogs
 *              description: create a new blog (fromData
 *              consumer: 
 *                  -   multipart/form-data
 *              parameters: 
 *                  -   in: formData
 *                      name: title
 *                      type: string
 *                      required: true
 *                  -   in: formData
 *                      name: decription
 *                      type: string
 *                  -   in: formData
 *                      name: tags
 *                      example: #tag1#tag2#tag3
 *                      type: string
 *                  -   in: formData
 *                      name: categories
 *                      type: string
 *                  -   in: formData
 *                      name: body
 *                      type: string
 *                  -   in: formData
 *                      name: cartimg
 *                      type: file
 *                  -   in: formData
 *                      name: gallery
 *                      type: file
 *              responses:
 *                  200:
 *                      description: succses
 */

router.post("/create-blog",uploadFile.single("cartimg"),stringToArray("tags"), blogsController.creatBlog)
module.exports = {
    blogRoutes : router
};
