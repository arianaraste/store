const categoryController = require("../../http/controller/admin/category.controller");
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
 *      /admin/category/create-category:
 *          post:
 *              summary: create Category
 *              description : create category
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

router.post("/create-category" , CategoryController.createCategory)
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/find-by-id/{ID}:
 *          get:
 *              summary: get Category by id
 *              description : input your id by param
 *              tags: [Category]
 *              parameters: 
 *              -   name: ID
 *                  description: input ID of category
 *                  in: path
 *                  type: string
 *                  required: true
 *              responses : 
 *                  200: 
 *                      description : succes
 *                  400: 
 *                      description : not Found
 * 
 * 
 */
router.get("/find-by-id/:ID" , CategoryController.getCategoryByID);
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/patch-category/{ID}:
 *          patch:
 *              summary: patch Category by id
 *              description : input your id by param
 *              tags: [Category]
 *              parameters: 
 *              -   name: ID
 *                  description: input ID of category
 *                  in: path
 *                  type: string
 *                  required: true
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
 *                  400: 
 *                      description : not Found
 * 
 * 
 */
router.patch("/patch-category/:ID" , CategoryController.updateCategory);
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/delete-category/{ID}:
 *          delete:
 *              summary: delete Category by id
 *              description : delete your id by param
 *              tags: [Category]
 *              parameters:
 *              -   in: path
 *                  name : ID
 *                  description: input id category 
 *                  required : true
 *                  string: string
 *              responses: 
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: notFound
 *              
 * 
 */
router.delete("/delete-category/:ID" , CategoryController.removeCategory)

/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/list-of-categories:
 *          get:
 *              summary: get all categories
 *              description : get all category
 *              tags: [Category]
 *              responses: 
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: notFound
 *              
 * 
 */

router.get("/list-of-categories" , CategoryController.getAllCategory);
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/get-all-sub-category:
 *          get:
 *              summary: get all sub categories
 *              description : get all sub category
 *              tags: [Category]
 *              responses: 
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: notFound
 *              
 * 
 */

router.get("/get-all-sub-category", CategoryController.getSubCategory)
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/get-all-parents-of-category:
 *          get:
 *              summary: get all parents categories
 *              description : get all patrents category
 *              tags: [Category]
 *              responses: 
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: notFound
 *              
 * 
 */

router.get("/get-all-parents-of-category", CategoryController.getAllParentsCategory)
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/get-all-childern-of-category/{parentID}:
 *          get:
 *              summary: get all childern categories
 *              description : get all childern category
 *              tags: [Category]
 *              parameters: 
 *              -   name: parentID
 *                  in: path
 *                  description: input parentID
 *                  required: true
 *                  type:   string
 *              responses: 
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: notFound
 *              
 * 
 */

router.get("/get-all-childern-of-category/:parentID", CategoryController.getAllChildeCategory)
module.exports = {
    categoryRoutes : router
}