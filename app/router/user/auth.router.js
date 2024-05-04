const { UserAuthController } = require("../../http/controller/user/auth.controller");
/**
 *  
 */
/**
 * tags:
 *      name: userAuthentication
 *      description: user login authentication apis
 * 
 * @swagger
 * 
 *  paths: 
 *      /user/authentication/login:
 *          post:
 *              summary: user login in userpanel 
 *              description: user login by one time password (OTP)
 *              tags: [userAuthentication]
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
 * 
 * @swagger
 * 
 *  paths:
 *      /user/authentication/confirm-login:
 *          post:
 *              summary: check otp and send token for accses
 *              description: user have to confirm authentication and then we send a accses token
 *              tags: [userAuthentication]
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

router.post("/confirm-login" , UserAuthController.confirmLogin);

/**
 * @swagger
 * 
 *  paths:
 *      /user/authentication/sign-refresh-token:
 *          post:
 *              summary: sign Refresh Token
 *              description : sign refresh token and send acccses token with new Refresh token
 *              tags: [userAuthentication]
 *              parameters: 
 *              -   name: RefreshToken
 *                  description: input your RefreshToken
 *                  in: formData
 *                  type: string
 *                  required: true
 *              responses : 
 *                  200: 
 *                      description : succes
 * 
 */

router.post("/sign-refresh-token", UserAuthController.signrefreshToken)

module.exports = {
    AuthRouter : router
};