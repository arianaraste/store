const { date, func } = require("joi");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const errors = require("http-errors");
const {SECRET_KEY, REFRESH_SECRET_KEY} = require("./constans");
const redisClient = require("./redis_init")
const path = require("path")
const fs = require("fs")
function randomNumber(){
   return Math.floor((Math.random() * 90000)+ 10000)
};
function OTPMaker(){
    const Code = randomNumber()
    const expireTime =( new Date().getTime() + 120000);
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
                if(err) reject(errors.InternalServerError("خطای سرور"));
                resolve(token)
            }
        )
    })
};
function AccsesRefreshToken(userId){
    return new Promise(async (resolve , reject)=>{
        const user = await UserModel.findById(userId);
        JWT.sign(
            {
                phoneNumber : user.phoneNumber,
                userId : user._id
            },
            REFRESH_SECRET_KEY,
            {
                expiresIn: "1y"
            },
            async(err , token)=>{
                console.log(err);
                if(err) reject(errors.InternalServerError("خطای سرور"));
                const expire = 31536000;
                await redisClient.SETEX(userId.toString(),expire,token);
                return resolve(token);
            }
        )
    })
}
function verifyRefreshToken(token){
    return new Promise((resolve,reject)=>{
        JWT.verify(token,REFRESH_SECRET_KEY ,async(err , payload)=>{
            if(err) reject(errors.Unauthorized(err.message)); 
            const {phoneNumber} = payload || {};
            const user = await UserModel.findOne({phoneNumber} , {password : 0 , OTP : 0})
            console.log(user);
            if(!user) reject(errors.Unauthorized("حساب کاربری یافت نشد"));
            const RefreshToken = await redisClient.get(user._id.toString())
            if(token === RefreshToken) resolve(phoneNumber);
            reject(errors.Unauthorized("مجددا وارد حساب کاربری خود شوید"))
        });
    })
};
function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const url = req.url
    const directory  = path.join(__dirname, "..", ".." , "public", "uploads", url ,  year , month, day);
    req.body.fileUploadPath = directory
    fs.mkdirSync(directory , {recursive : true});    
    return directory 
};
function deleteFileInPublic(fileAddress){
    console.log(fileAddress);
    const filePath = path.join(__dirname , ".." , ".." , fileAddress);
    fs.unlinkSync(fileAddress);
    return
}

module.exports = {
    RandomNumberGenerator : randomNumber,
    OTPGenerator : OTPMaker,
    accsesToken,
    AccsesRefreshToken,
    verifyRefreshToken,
    createRoute,
    deleteFileInPublic
}