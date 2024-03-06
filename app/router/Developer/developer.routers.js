const bcrypt = require("bcrypt");
const { RandomNumberGenerator } = require("../../utills/function");

/**
 * 
 *  tags:
 *      name: DeveloperTools
 *      descriptoin : DeveloperRoute
 * 
 * @swagger
 *  paths:
 *      /DeveloperRoutes/hashStringMaker/{hashData}:
 *          get:
 *              summary : hashData Tools
 *              description : input your data to become hashString
 *              tags : [DeveloperTools]
 *              parameters: 
 *              -   in: path
 *                  name: data
 *                  description: input your data
 *                  required : true
 *                  type: string
 *              responses:
 *                  200:
 *                      description: success
 *                  400: 
 *                      description: not found
 *                  
 */
const router = require("express").Router();

router.get("/hashStringMaker/:hashData",async(req , res ,next)=>{

    try {
    const data = req.params.hashData;
    const salt = bcrypt.genSaltSync(data)
    const newHashData = bcrypt.hashSync(data , salt);
    return res.statusCode(200).send(newHashData);
    } catch (error) {
        console.log(error);
        next(error)
    }
});
/**
* 
* @swagger
*  paths:
*      /DeveloperRoutes/RandomNumber:
*          get:
*              summary : RandomNumber Tools
*              description : get RandomNumber
*              tags : [DeveloperTools]
*              responses:
*                  200:
*                      description: success
*                  400: 
*                      description: not found
*                  
*/


router.get("/RandomNumber" , async(req , res ,next)=>{
    try {
        return res.status(200).send(RandomNumberGenerator().toString);
    } catch (error) {
        next(error)
    }
    
});


module.exports = { 
    DeveloperRoutes : router
};