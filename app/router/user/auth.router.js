const { UserAuthController } = require("../../http/controller/user/auth.controller");

/**
 * tags:
 *      name: user-auth
 *      description: user login authentication apis
 * 
 * @swagger
 * 
 *  paths: 
 *      /user/login:
 *          post:
 *              summary: user login in userpanel 
 *              description: user login by one time password (OTP)
 *              tags: [user-auth]
 *              parameters:
 *              -   name: phoneNumber
 *                  description: get phone number for login
 *                  in: formData
 *                  type: string
 *                  required: true
 *              responses: 
 *                  201:
 *                      description: Succses
 *                  400: 
 *                      description: BadRequest
 *                  401:
 *                      description: UnAuthorization
 *                  500:
 *                      description: Internal Server Error
 * 
 */

const router = require("express").Router();

router.post("/login" , UserAuthController.login);

/**
 * tags:
 *      name: Confirm
 *      description: confirm otp
 * 
 * @swagger
 * 
 *  paths:
 *      /user/confirmLogin:
 *          post:
 *              summary: check otp and send token for accses
 *              description: user have to confirm authentication and then we send a accses token
 *              tags: [Confirm]
 *              parameters:
 *              -   name: phoneNumber
 *                  description: input your phoneNumber
 *                  in: formData
 *                  type: string
 *                  required: true
 *              -   name: Code
 *                  description: input your otp Code
 *                  in: formData
 *                  type: string
 *                  required: true
 *              responses: 
 *                  201:
 *                      description: Succses
 *                  400: 
 *                      description: BadRequest
 *                  401:
 *                      description: UnAuthorization
 *                  500:
 *                      description: Internal Server Error
 */

router.post("/confirmLogin" , UserAuthController.confirmLogin);

module.exports = {
    AuthRouter : router
}