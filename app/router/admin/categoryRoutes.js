const { CategoryController } = require("../../http/controller/admin/category.controller");
const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type:   object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type:   string
 *                      description:    title of category
 *                  parent:
 *                      type:   string
 *                      description:    parnet of category
 *          UpdatCategory:
 *              type:   object
 *              properties:
 *                  title:
 *                      type:   string
 *                      description:    title   of  category
 *                  parent:
 *                      type:   string
 *                      description:    update  parents category
 */
/**
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/create-category:
 *          post:
 *              summary: create Category
 *              description : create category
 *              tags: [Category]
 *              requestBody:
 *                  required: true
 *                  content:    
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:   '#/components/schemas/Category'
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/Category'
 *              responses : 
 *                  200: 
 *                      description : succes
 * 
 * 
 */


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
 *              requestBody:
 *                  required:   ture
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:   '#/components/schemas/UpdateCategory'
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/UpdateCategory'
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
 *      /admin/category/list-of-categories-with-populate:
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

router.get("/list-of-categories-with-populate"  , CategoryController.getAllCateorywhitpopulate);
/**
 * 
 * 
 * @swagger
 * 
 *  paths:
 *      /admin/category/list-of-categories-with-out-populate:
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

router.get("/list-of-categories-with-out-populate" , CategoryController.getAllCategoryWhitOutputPopulate);
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
 *      /admin/category/get-all-childern-of-category:
 *          get:
 *              summary: get all childern categories
 *              description : get all childern category
 *              tags: [Category]
 *              responses: 
 *                  200:
 *                      description: succes
 *                  400:
 *                      description: notFound
 *              
 * 
 */

router.get("/get-all-childern-of-category", CategoryController.getAllChildeCategory)
module.exports = {
    categoryRoutes : router
}