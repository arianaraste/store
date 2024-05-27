const { date, func } = require("joi");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const errors = require("http-errors");
const {SECRET_KEY, REFRESH_SECRET_KEY} = require("./constans");
const redisClient = require("./redis_init")
const path = require("path")
const fs = require("fs");
const { log } = require("console");
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
};
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
};
function verifyRefreshToken(token){
    return new Promise((resolve,reject)=>{
        JWT.verify(token,REFRESH_SECRET_KEY ,async(err , payload)=>{
            if(err) reject(errors.Unauthorized(err.message)); 
            const {phoneNumber} = payload || {};
            const user = await UserModel.findOne({phoneNumber} , {password : 0 , OTP : 0})
            console.log(user);
            if(!user) reject(errors.Unauthorized("حساب کاربری یافت نشد"));
            const RefreshToken = await redisClient.get(user._id.toString());
            if(!RefreshToken) reject(errors.Unauthorized("مجددا وارد حساب کاربری خود شوید"));
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
    const directory = path.join(__dirname, "..", ".." , "public", "uploads", url ,  year , month, day);
    req.body.fileUploadPath = path.join("uploads", url, year, month, day);
    fs.mkdirSync(directory , {recursive : true});    
    return directory 
};
function deleteFileInPublic(fileAddress){
    if(fileAddress){
    const filePath = path.join(__dirname , ".." , ".." , fileAddress);
    if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    return
};
function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return (files.map(file => path.join(fileUploadPath, file.filename)))
    } else {
        return []
    }
};
function setFeatures(body){
    const {colors, length, height, width, weight, madein} = body;
    let features = {};
    features.colors= colors;
            if(!length){ features.length = 0}else{features.length = length};
            if(!height){ features.height = 0}else{features.height = height};
            if(!width){ features.weight = 0}else{features.width = width};
            if(!weight){ features.weight = 0}else{features.weight = weight};
            if(!colors){ features.colors = 0}else{features.colors = colors};
            if(!madein){ features.madein = 0}else{features.madein = madein};
        return features;
};
function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
};
function deleteInvalidPropertyOnObject(object = {}, blackList = []){
    let nullishData = ["0",""," ",0,null,undefined];
     Object.keys(object).forEach(key => {
        if(blackList.includes(key)) delete object[key];
        if(typeof object[key] == "string") object[key].trim();
        if(Array.isArray(object[key]) && object[key].length > 0) object[key] = object[key].map(item => item.trim());
        if(Array.isArray(object[key]) && object[key].length == 0) delete object[key];
        if(nullishData.includes(object[key])) delete object[key];
     })
};

module.exports = {
    RandomNumberGenerator : randomNumber,
    OTPGenerator : OTPMaker,
    accsesToken,
    AccsesRefreshToken,
    verifyRefreshToken,
    createRoute,
    deleteFileInPublic,
    ListOfImagesFromRequest : ListOfImagesFromRequest,
    setFeatures,
    deleteInvalidPropertyOnObject,
    copyObject
};