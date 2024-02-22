const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String , required : true},
    last_name : {type : String , required : true},
    profileImg : {type : [String]},
    phone : {type : String},
    email : {type : String ,  required : true},
    username : {type : String ,  required : true},
    password : {type : String , require : true},
    Role : {type : [String] , default : ["USER"]},
    bills : {type : [] , default : []},
    discount_code : {type : Number , default : 0}
    

});

module.exports = {
    UsersSchema :  mongoose.model("user",Schema)
}