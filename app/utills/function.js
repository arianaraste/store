const { date } = require("joi");
const { Long } = require("mongodb");

function randomNumber(){
   return Math.floor((Math.random() * 90000)+ 10000)
};
function OTPMaker(){
    const OTP = randomNumber()
    const expireTime = (new Date().getTime()) + 120000;
    let OTPPack = {
        OTP,
        expireTime
    }
    console.log(OTPPack);
    return OTPPack;
}
const falseData = ["" , " ", null , 0 , undefined , "0" , NaN];

module.exports = {
    RandomNumberGenerator : randomNumber,
    OTPGenerator : OTPMaker,
    falseData
}