const { UserAuthController } = require("../../http/controller/user/auth.controller");
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  - phoneNumber
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: input phoneNumber
 *          CheckOTP:
 *              type: object
 *              required:
 *                  - phoneNumber
 *                  - Code
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: input phoneNumber
 *                  Code:
 *                      type: string
 *                      description: input received code
 *          RefreshToken:
 *              type:   object
 *              required:
 *                  -   RefreshToken
 *              properties:
 *                  RefreshToken:
 *                      type:   string
 *                      description:    input RefreshToken
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
 *              requestBody:
 *                  required:   true
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:   '#/components/schemas/GetOTP'
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/GetOTP'
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
 *              requestBody:
 *                  required:   true
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:   '#/components/schemas/CheckOTP'
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/CheckOTP'
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
 *         post:
 *              summary: sign Refresh Token
 *              description : sign refresh token and send acccses token with new Refresh token
 *              tags: [userAuthentication]
 *              requestBody:
 *                  required:   true
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:   '#/components/schemas/RefreshToken'
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/RefreshToken'
 *              responses : 
 *                  200: 
 *                      description : succes
 * 
 */

router.post("/sign-refresh-token", UserAuthController.signrefreshToken)

module.exports = {
    AuthRouter : router
};