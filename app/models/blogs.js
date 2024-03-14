const { date, number } = require("joi");
const { default: mongoose } = require("mongoose");
// for defult categories : "دسته بندی نشده"
const commentSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId , ref : "user" ,required: true},
    comment : {type : String,required: true},
    createdAt : {type : Date, default : 0},
    ike : {type : [mongoose.Types.ObjectId] ,ref : "users", defult : []},
    deslike : {type :[mongoose.Types.ObjectId] ,ref : "users", defult : []},
    replay : {type :[mongoose.Types.ObjectId] ,ref : "users", defult : []},
})

const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , required : true},
    title : {type : String , required : true},
    discription : { type : String},
    body : {type : String},
    cartimg : {type : String},
    gallery : {type : [String]},
    categories : {type : [mongoose.Types.ObjectId], default : [] } ,
    tags : {type : [String] ,defult : []},
    like : {type : [mongoose.Types.ObjectId] ,ref : "users", defult : []},
    deslike : {type :[mongoose.Types.ObjectId] ,ref : "users", defult : []},
    comment : {type : [commentSchema] ,ref : "users", defult : []},
    bookmark : {type : [mongoose.Types.ObjectId] ,ref : "users", defult : []} 
});

module.exports = {
    BlogModel :  mongoose.model("Blog",Schema)
}