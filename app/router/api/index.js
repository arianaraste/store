const homeControllers = require("../../http/controller/api/homeControllers");
const verifyAccsesToken = require("../../http/middlewares/verifyAccsesToken");
const router = require("express").Router();

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

router.get("/" ,verifyAccsesToken, homeControllers.indexpage)
module.exports = {
    HomeRoutes : router
}