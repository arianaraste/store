const homeControllers = require("../../http/controller/api/homeControllers");

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
 *          responses:
 *              200:
 *                  description: success
 *              400: 
 *                  description: not found
 *              
 */

const router = require("express").Router();
router.get("/" , homeControllers.indexpage)
module.exports = {
    HomeRoutes : router
}