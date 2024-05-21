const {productController} = require("../../http/controller/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utills/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: string
 *              enum:
 *                  - black
 *                  - white
 *                  - gray                
 *                  - red
 *                  - blue
 *                  - green
 *                  - orange
 *                  - purple
 *          Product:
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
 *              properties:
 *                  title:  
 *                      type: string
 *                      description: عنوان محصول
 *                  description:  
 *                      type: string
 *                      description: توضیحات محصول
 *                  text:  
 *                      type: string
 *                      description: متن محصول
 *                  tags:  
 *                      type: array
 *                      description: برچسب‌های محصول
 *                      items:
 *                          type: string
 *                  category:  
 *                      type: string
 *                      description: دسته‌بندی محصول
 *                  price:  
 *                      type: number
 *                      description: قیمت محصول
 *                  discount:  
 *                      type: number
 *                      description: تخفیف محصول
 *                  count:  
 *                      type: number
 *                      minimum: 0
 *                      description: تعداد موجودی محصول
 *                  images:  
 *                      type: array
 *                      description: تصاویر محصول
 *                      items:
 *                          type:   string
 *                          format: binary
 *                  height:
 *                      type: number
 *                      minimum: 0
 *                      description: ارتفاع بسته محصول
 *                  weight:
 *                      type: number
 *                      minimum: 0
 *                      description: وزن بسته محصول
 *                  width:
 *                      type: number
 *                      minimum: 0
 *                      description: عرض بسته محصول
 *                  length:
 *                      type: number
 *                      minimum: 0
 *                      description: طول بسته محصول
 *                  type:
 *                      type: string
 *                      description: نوع محصول  مجازی - فیزیکی
 *                      example: مجازی - فیزیکی
 *                  colors:
 *                      type: array
 *                      description: رنگ‌های محصول
 *                      items:
 *                          $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 *  /admin/product/create-product:
 *      post:
 *          tags: [Product]  
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          
 *          responses:
 *              201:
 *                  description : product created
 */


router.post("/create-product", uploadFile.array("images",10), stringToArray("tags"), productController.createProduct);
/**
 * @swagger
 *  /admin/product/product-list/:
 *      get:
 *          summary: all product get
 *          description: get all product in list
 *          tags: [Product]
 *          responses:
 *              200:
 *                  description: succes
 */
router.get("/product-list", productController.getAllProduct);
/**
 * @swagger 
 *  paths:
 *      /admin/product/find-by-id/{ID}:
 *          get: 
 *              summary: find product by id
 *              description: find product with param {id}
 *              parameters:
 *                  -   name: ID
 *                      descriptipon: product id
 *                      in: path
 *                      type: string
 *                      required:   true
 *                       
 *              tags: [Product]
 *              responses:
 *                  200:
 *                      descriptiopn: succes
 */
router.get("/find-by-id/:ID", productController.getProductById);
/**
 * @swagger 
 *  paths:
 *      /admin/product/remove/{ID}:
 *          delete: 
 *              summary: delete product by id
 *              description: delete product with param {id}
 *              parameters:
 *                  -   name: ID
 *                      descriptipon: product id
 *                      in: path
 *                      type: string
 *                      required:   true
 *                       
 *              tags: [Product]
 *              responses:
 *                  200:
 *                      descriptiopn: succes
 */
router. delete("/remove/:ID", productController.deleteProduct)
module.exports = {
    productRoutes : router
}