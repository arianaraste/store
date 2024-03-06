const { CategoryController } = require("../../http/controller/admin/category.controller");


/**
 * 
 *  tags:
 *      name:Category
 *      description:
 * 
 * @swagger
 * 
 *  paths:
 *      /Category/addCategory:
 *          post:
 *              summary: add Category
 *              description : add and make a category
 *              tags: [Category]
 *              parameters: 
 *              -   name: title
 *                  description: input title of category
 *                  in: formData
 *                  type: string
 *                  required: true
 *              -   name: description
 *                  description: input description of category
 *                  in: formData
 *                  type: string
 *                  required: false
 *              -   name: parent
 *                  description: input parent of category
 *                  in: formData
 *                  type: string
 *                  required: false
 *              -   name: img
 *                  description: input img of category
 *                  in: formData
 *                  type: string
 *                  required: false
 *              responses : 
 *                  200: 
 *                      description : succes
 * 
 * 
 */
const router = require("express").Router();


router.post("/addCategory" , CategoryController.addCategory)

module.exports = {
    categoryRoutes : router
}