const {blogsController} = require("../../http/controller/admin/blogs.controller");
const { uploadFile } = require("../../utills/multer");
const {stringToArray} = require("../../http/middlewares/stringToArray");
const { verifyaccsesToken } = require("../../http/middlewares/verifyAccsesToken");
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
 *              parameters: 
 *                  -   in: header
 *                      name: accsestoken
 *                      type: string 
 *                      example: Bearer token
 *                      value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA5MTUyMDU2NTc3IiwidXNlcklkIjoiNjVkZjI1YmI5MzkyNzEwMmU4MjJkOWI5IiwiaWF0IjoxNzEwNzY5MjY2LCJleHAiOjE3MTA3NzI4NjZ9.imneYobMVX_iru13gpd1l71oAT5AVXyxl42INLrlYd0
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
 *                  -   in: header
 *                      name: accsestoken
 *                      type: string 
 *                      example: Bearer token
 *                      value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA5MTUyMDU2NTc3IiwidXNlcklkIjoiNjVkZjI1YmI5MzkyNzEwMmU4MjJkOWI5IiwiaWF0IjoxNzEwNzY5MjY2LCJleHAiOjE3MTA3NzI4NjZ9.imneYobMVX_iru13gpd1l71oAT5AVXyxl42INLrlYd0
 *                  -   in: formData
 *                      name: title
 *                      type: string
 *                      required: true
 *                  -   in: formData
 *                      name: decription
 *                      type: string
 *                  -   in: formData
 *                      name: tags
 *                      example: #tag
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

router.post("/create-blog",verifyaccsesToken ,uploadFile.single("cartimg"),stringToArray("tags"), blogsController.creatBlog)
module.exports = {
    blogRoutes : router
};
