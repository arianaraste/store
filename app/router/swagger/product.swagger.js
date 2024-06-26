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
 *          UpdateProduct:
 *              type: object
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
 *                     
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
/**
 * @swagger
 *  /admin/product/product-list/:
 *      get:
 *          summary: all product get
 *          description: get all product in list
 *          tags: [Product]
 *          parameters: 
 *              -   in: query 
 *                  name: search 
 *                  type: string
 *                  description: search on product and find product
 *          responses:
 *              200:
 *                  description: succes
 */
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
 *                      in: query
 *                      type: string
 *                      required:   true
 *                       
 *              tags: [Product]
 *              responses:
 *                  200:
 *                      descriptiopn: succes
 */
/**
 * @swagger 
 *  paths:
 *      /admin/product/remove/{ID}:
 *          delete: 
 *              summary: delete product by id
 *              description: delete product with param {id}
 *              parameters:
 *                  -   in: path
 *                      name: ID
 *                      descriptipon: product id
 *                      type: string
 *                      required:   true
 *                       
 *              tags: [Product]
 *              responses:
 *                  200:
 *                      descriptiopn: succes
 */

/**
 * @swagger 
 *  paths:
 *      /admin/product/update/{ID}:
 *          patch:
 *               summary: update product by id
 *               description: update product with param {id}
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
 *                              $ref: '#/components/schemas/UpdateProduct'
 *               tags: [Product]
 *               responses: 
 *                  200:
 *                      desciption: succes
 *  
 */
