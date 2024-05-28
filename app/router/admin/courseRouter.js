const { courseController } = require("../../http/controller/admin/course.controller");
const course = require("../../models/course");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          types:
 *              type: string
 *              enum:
 *                  - free
 *                  - cash
 *                  - spcial                
 *          Course:
 *              type: object
 *              required:
 *                  - title
 *                  - description
 *                  - text
 *                  - tags
 *                  - category
 *                  - price
 *                  - discount
 *                  - count
 *                  - images
 *                  - type
 *              properties:
 *                  title:  
 *                      type: string
 *                      description: عنوان دوره
 *                  description:  
 *                      type: string
 *                      description: توضیحات دوره
 *                  text:  
 *                      type: string
 *                      description: متن دوره
 *                  tags:  
 *                      type: array
 *                      description: برچسب‌های دوره
 *                      items:
 *                          type: string
 *                  category:  
 *                      type: string
 *                      description: دسته‌بندی دوره
 *                  price:  
 *                      type: number
 *                      description: قیمت دوره
 *                  discount:  
 *                      type: number
 *                      description: تخفیف دوره
 *                  count:  
 *                      type: number
 *                      minimum: 0
 *                      description: تعداد موجودی دوره
 *                  images:  
 *                      type: string
 *                      description: تصاویر دوره
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/types'
 *          UpdateCourse:
 *              type: object
 *              properties:
 *                  title:  
 *                      type: string
 *                      description: عنوان دوره
 *                  description:  
 *                      type: string
 *                      description: توضیحات دوره
 *                  text:  
 *                      type: string
 *                      description: متن دوره
 *                  tags:  
 *                      type: array
 *                      description: برچسب‌های دوره
 *                      items:
 *                          type: string
 *                  category:  
 *                      type: string
 *                      description: دسته‌بندی دوره
 *                  price:  
 *                      type: number
 *                      description: قیمت دوره
 *                  discount:  
 *                      type: number
 *                      description: تخفیف دوره
 *                  images:  
 *                      type: string
 *                      description: تصاویر دوره
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/types'
 *                     
 */

/**
 * @swagger
 *  paths:
 *      /admin/course/list:
 *          get:
 *              summary: get All Course
 *              description: get list all of course
 *              tags: [Course]
 *              parameters: 
 *                  -   in: query
 *                      type: string
 *                      name: search
 *                      description: search on courses               
 *              responses: 
 *                  200:
 *                      description: succes
 * 
 */
router.get("/list", courseController.getListOfCoures);
/**
 * @swagger
 *  /admin/course/create-course:
 *      post:
 *          tags: [Course]  
 *          summary: create and save Course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          
 *          responses:
 *              201:
 *                  description : product created
 */

router.post("/create-course", courseController.createCourse);
//router.delete();
/**
 * @swagger 
 *  paths:
 *      /admin/course/update/{ID}:
 *          patch:
 *               summary: update Course by id
 *               description: update Course with param {id}
 *               parameters:
 *                  -   in: path
 *                      name: ID 
 *                      description: product id
 *                      type: string
 *                      required: true
 *               requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/UpdateCourse'
 *               tags: [Course]
 *               responses: 
 *                  200:
 *                      desciption: succes
 *  
 */
router.patch("/update/:ID", courseController.updateCourse);

module.exports = {
    courseRouter :  router
}