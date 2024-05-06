const {blogsController} = require("../../http/controller/admin/blogs.controller");
const { uploadFile } = require("../../utills/multer");
const {stringToArray} = require("../../http/middlewares/stringToArray");
const router = require("express").Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: title for Blog
 *         description:
 *           type: string
 *           description: description of blog
 *         text:
 *           type: string
 *           description: information blog
 *         tags:
 *           type: string
 *           description: input tags
 *         category:
 *           type: string
 *           description: select category
 *         image:
 *           type: string
 *           description: input blog image
 *     UpdateBlog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: title for Blog
 *         description:
 *           type: string
 *           description: description of blog
 *         text:
 *           type: string
 *           description: information blog
 *         tags:
 *           type: string
 *           description: input tags
 *         category:
 *           type: string
 *           description: select category
 *         image:
 *           type: string
 *           description: input blog image
 */
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
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      multipart/form-data:
 *                          schema:
 *                              $ref:   '#/components/schemas/Blog'
 *              responses:
 *                  200:
 *                      description: succses
 */

router.post("/create-blog",uploadFile.single("cartimg"),stringToArray("tags"), blogsController.creatBlog);

/**
 * 
 * @swagger
 *  paths:
 *      /admin/blog/find-by-id/{ID}:
 *          get:
 *              summary: find blog dy id
 *              description: find spcial blog with id
 *              tags: [blogs]
 *              parameters:
 *                  -   in: path
 *                      name: ID
 *                      description: input ypur blog id
 *                      type: string
 *                      required: true
 *              responses:
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: not found
 * 
 * 
 */

router.get("/find-by-id/:ID", blogsController.getByIdBlog);

/**
 * 
 * @swagger
 *  paths:
 *      /admin/blog/delete-by-id/{ID}:
 *          delete:
 *              summary: delete blog by id
 *              description: find spcial blog with id
 *              tags: [blogs]
 *              parameters:
 *                  -   in: path
 *                      name: ID
 *                      description: input ypur blog id
 *                      type: string
 *                      required: true
 *              responses:
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: not found
 * 
 * 
 */

router.delete("/delete-by-id/:ID" , blogsController.deleteBlog);

/**
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/blog/update/{ID}:
 *          patch:
 *              tags: [blogs]
 *              summary: update blogs
 *              description: update blog by id 
 *              consumer: 
 *                  -   multipart/form-data
 *              parameters: 
 *                  -   in: path
 *                      name: ID
 *                      type: string
 *                      required: true
 *              requestBody:
 *                 required: true
 *                 content:
 *                       multipart/form-data:
 *                          schema:
 *                              $ref:   '#/components/schemas/UpdateBlog'
 *              responses:
 *                  202:
 *                      description: accepted
 */

router.patch("/update/:ID",uploadFile.single("cartimg"),stringToArray("tags"), blogsController.updateBlog);

module.exports = {
    blogRoutes : router
};
