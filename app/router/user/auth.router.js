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

module.exports = {
    AuthRouter : router
}