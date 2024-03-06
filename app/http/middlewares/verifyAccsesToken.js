const JWT = require("jsonwebtoken");
const errors = require("http-errors");
const { SECRET_KEY } = require("../../utills/constans");
const { UserModel } = require("../../models/users");
function verifyaccsesToken(req , res ,next){
    try {
        const [Bearer , token] = req.headers.accsestoken.split(" ")
        
        if(!token) throw errors.Unauthorized("وارد حساب کاربری خود شوید");
        JWT.verify(token,SECRET_KEY ,async (err , payload)=>{
            if(err) throw errors.Unauthorized(err.message);
            const {phoneNumber} = payload;
            console.log(payload);
            const user = await UserModel.findOne({phoneNumber} , {password : 0 , OTP : 0})  ;
            if(!user) throw errors.Unauthorized("حساب کاربری یافت نشد") ;
            req.user =  user;
            return next()
        });
    } catch (error) {
        console.log(error);
        next(error.message)
    }
};
module.exports = {
    verifyaccsesToken
};