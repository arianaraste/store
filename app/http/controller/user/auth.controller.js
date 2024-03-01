const errors = require("http-errors");
const { confirmLoginSchema, loginSchema } = require("../../validators/user/user.auth.schema");
const { RandomNumberGenrator, OTPGenerator, accsesToken, AccsesRefreshToken, verifyRefreshToken} = require("../../../utills/function");
const { UsersSchema, UserModel } = require("../../../models/users");
const {falseData} = require("../../../utills/constans");
class UserAuthController {
    async login(req , res , next){
        try {
            await loginSchema.validateAsync(req.body);
            const {phoneNumber} = req.body;
            const OTPPack = OTPGenerator();
            const user = await UserModel.findOne({phoneNumber});
            Object.keys(OTPPack).forEach(key => {
                if(falseData.includes(OTPPack[key])) delete OTPPack[key];
            });
            if(!user){
                const userCreate = await UserModel.create({
                    phoneNumber,
                    OTP : OTPPack,
                    Role : "USER"
                });
                if(!userCreate) throw errors.Unauthorized("ورود انجام نشد")
            }

            const updateUser = await UserModel.updateOne({phoneNumber}, {$set : {OTP : OTPPack}})
                
            return res.status(200).send({
                statusCode : 200,
                message : OTPPack.Code+":کد ورود شما",
            })
        } catch (error) {
            console.log(error);
            next(errors.BadRequest(error.message))
        };
    };
    async confirmLogin(req , res , next){
        try {
        await confirmLoginSchema.validateAsync(req.body);
        const {phoneNumber , Code} = req.body
        const user = await UserModel.findOne({phoneNumber});
        if(!user) throw errors.NotFound("کاربری یافت نشد");
        if(+Code !== user.OTP.Code ) throw errors.Unauthorized("کد وارد شده صحیح نمی باشد")
        if(user.OTP.expireTime < Date.now()) throw errors.Unauthorized("کد وارد شده منقضی میباشد");
        const token = await accsesToken(user._id);
        const SignRefreshToken = await AccsesRefreshToken(user._id);
        return res.status(200).json({
            data : {
                token,
                SignRefreshToken
            }
        })

        } catch (error) {
            console.log(error);
            next(error)
        }
    };
    async signrefreshToken(req , res , next){
        try {
            const refreshToken= req.body.RefreshToken;
            const phoneNumber = await verifyRefreshToken(refreshToken);
            console.log(phoneNumber);
            const user = await UserModel.findOne({phoneNumber});
            const accses = await accsesToken(user._id);
            const newRefresh = await AccsesRefreshToken(user._id);
            return res.json({
                data :{
                    accsesToken : accses,
                    refreshToken : newRefresh
                }
            })
            
        } catch (error) {
            console.log(error);
            next(errors.Unauthorized("token has peroblm"))
        }
    }
    
};;


module.exports = {
    UserAuthController : new UserAuthController()
}
