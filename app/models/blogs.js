const { default: mongoose } = require("mongoose");
// for defult categories : "دسته بندی نشده"
const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , required : true},
    title : {type : String , required : true},
    discription : { type : String},
    body : {type : String},
    cartimg : {type : String},
    gallery : {type : [String]},
    categories : {type : [mongoose.Types.ObjectId], default : [] } ,
    tags : {type : [String] ,defult : []},
    like : {type : [mongoose.Types.ObjectId] , defult : []},
    deslike : {type :[mongoose.Types.ObjectId] , defult : []},
    comment : {type : [mongoose.Types.ObjectId] , defult : []},
    bookmark : {type : [mongoose.Types.ObjectId] , defult : []} 
});

module.exports = {
    BlogSchema :  mongoose.model("Blog",Schema)
}