const errors = require("http-errors");
const { authSchema } = require("../../validators/user/user.auth.schema");
const { RandomNumberGenrator, OTPGenerator, falseData } = require("../../../utills/function");
const { UsersSchema, UserModel } = require("../../../models/users");
const { object } = require("joi");
class UserAuthController {
    async login(req , res , next){
        try {
            console.log(req.body);
            const body = await authSchema.validateAsync(req.body);
            const {phoneNumber} = req.body;
            const OTP = OTPGenerator()
            const user = await UserModel.findOne({phoneNumber});
            if(!user){
                const userCreate = await UserModel.create({
                    phoneNumber,
                    OTP,
                    Role : "USER"
                });
                if(!userCreate) throw errors.Unauthorized("ورود انجام نشد")
                console.log("!");
            }
            
                Object.keys(OTP).forEach(key => {
                    if(falseData.includes(OTP[key])) delete OTP[key];
                });
                const updateUser = await UserModel.updateOne({phoneNumber} , {$set : OTP})
                console.log("!")
            
            return res.status(200).send({
                statusCode : 200,
                message : OTP.OTP+":کد ورود شما",
        
            })
        } catch (error) {
            console.log(error);
            next(errors.BadRequest(error.message))
        }
    };
    
};;


module.exports = {
    UserAuthController : new UserAuthController()
}
