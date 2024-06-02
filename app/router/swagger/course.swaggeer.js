/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *              type: object
 *              required:
 *                  -   ID
 *                  -   title
 *              properties:
 *                  ID:
 *                     type:   string
 *                     description:
 *                     example:   62822e4ff68cdded54aa928d 
 *                  title:
 *                     type:   string
 *                     description: title of chapter
 *                     example: zero to hero java script course
 *                  text:
 *                     type: string
 *                     description: text of chapter
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
 *                  - image
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
 *                  image:  
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
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: interger
 *                                      example: 20
 *                                  studendtCount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      example: "aryan araste"
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
 *                      content:
 *                          application/json: 
 *                              schema:
 *                                  $ref : '#/definitions/ListOfCourses'
 * 
 */

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
 *                  description : course created
 */

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
/**
 * @swagger
 *      paths:
 *          /admin/course/add-chapter:
 *              put:
 *                  tags:   [Course]
 *                  summary: add chapter of course
 *                  description: push on chapter by update method
 *                  requestBody:
 *                      required: true
 *                      content:
 *                          application/x-www-form-urlencoded:
 *                              schema:
 *                                  $ref: '#/components/schemas/addChapter'
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/addChapter'
 *                  responses:
 *                      200:    
 *                          description:
 *                          content: 
 *                              application/json:
 *                                  schema:
 *                                      $ref: '#/definitions/ListOfCourses'
 *                              
 *                  
 *          
 *                  
 */
