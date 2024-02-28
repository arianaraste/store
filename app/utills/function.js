const { date } = require("joi");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const errors = require("http-errors");
const {SECRET_KEY} = require("./constans")
function randomNumber(){
   return Math.floor((Math.random() * 90000)+ 10000)
};
function OTPMaker(){
    const Code = randomNumber()
    const expireTime = Date.now() + 120000;
    let OTPPack = {
        Code,
        expireTime
    }
    return OTPPack;
}
function accsesToken (userId){
    return new Promise(async (resolve , reject)=>{
        const user = await UserModel.findById(userId);
        
        console.log(SECRET_KEY);
        JWT.sign(
            {
                phoneNumber : user.phoneNumber,
                userId : user._id
            },
            SECRET_KEY,
            {
                expiresIn: "1h"
            },
            (err , token)=>{
                console.log(err);
                if(err) throw errors.InternalServerError("خطای سرور");
                resolve(token)
            }
        )
    })
}

module.exports = {
    RandomNumberGenerator : randomNumber,
    OTPGenerator : OTPMaker,
    accsesToken

}