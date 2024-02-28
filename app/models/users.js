const { object } = require("joi");
const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String },
    profileImg : {type : [String]},
    phoneNumber : {type : String,required : true},
    email : {type : String},
    username : {type : String , lowercase : true },
    password : {type : String },
    Role : {type : [String] , default : ["USER"]},
    bills : {type : [] , default : []},
    discount_code : {type : Number , default : 0},
    OTP : { type : Object , default  : {
        Code : 0 ,
        expireTime  : 0
     }
    }

});

module.exports = {
    UserModel :  mongoose.model("user",Schema)
}