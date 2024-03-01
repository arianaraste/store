const homeControllers = require("../../http/controller/api/homeControllers");
const router = require("express").Router();
const {verifyaccsesToken} = require("../../http/middlewares/verifyAccsesToken")
/**
 * tags:
 *      name: index
 *      description: index routes
 * @swagger
 *  paths:
 *      /:
 *       get:
 *          summary: index main page
 *          tags: [index]
 *          description: index API
 *          parameters:
 *              -   in: header
 *                  name: accsesToken
 *                  example: Bearer Token
 *          responses:
 *              200:
 *                  description: success
 *              400: 
 *                  description: not found
 *              
 */

router.get("/" ,verifyaccsesToken, homeControllers.indexpage)


module.exports = {
    HomeRoutes : router
}