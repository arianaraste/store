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
 *      /developer-router/hash-string-maker/{hashData}:
 *          post:
 *              summary : hashData Tools
 *              description : input your data to become hashString
 *              tags : [DeveloperTools]
 *              parameters: 
 *              -   in: path
 *                  name: hashData
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

router.post("/hash-string-maker/:hashData",async(req , res ,next)=>{

    try {
    const {hashData} = req.params;
    console.log(hashData);
    const salt = bcrypt.genSaltSync(10);
    const newHashData = bcrypt.hashSync(hashData , salt);
    console.log(newHashData);
    res.status(200).send(newHashData);
    } catch (error) {
        console.log(error);
        next(error)
    }
});
/**
* 
* @swagger
*  paths:
*      /developer-router/random-number:
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


router.get("/random-number" , async(req , res ,next)=>{
    
    try {
        res.status(200).json({
            status : 200,
            randomNumber : RandomNumberGenerator()
        })
    } catch (error) {
        next(error)
    }

});


module.exports = { 
    DeveloperRoutes : router
};