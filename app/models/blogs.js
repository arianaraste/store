const { date, number } = require("joi");
const { default: mongoose } = require("mongoose");
const categories = require("./categories");
const { CommentSchema } = require("./public.schema");
// for defult categories : "دسته بندی نشده"


const Schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId, ref : "user" , required : true},
    title : {type : String , required : true},
    discription : { type : String},
    body : {type : String},
    cartimg : {type : String},
    gallery : {type : [String]},
    categories : {type : [mongoose.Types.ObjectId], ref : "Categories", default : [] } ,
    tags : {type : [String] ,defult : []},
    like : {type : [mongoose.Types.ObjectId] ,ref : "users", defult : []},
    deslike : {type :[mongoose.Types.ObjectId] ,ref : "users", defult : []},
    comment : {type : [CommentSchema], defult : []},
    bookmark : {type : [mongoose.Types.ObjectId] ,ref : "users", defult : []} 
},{
  timestamps : true, 
  toJSON : {
    virtuals : true 
  }  
});
Schema.virtual("user" ,{
    ref : "user",
    localField : "_id",
    foreignField : "author"
});
Schema.virtual("category" , {
    ref : "Categories",
    localField: "_id",
    foreignField: "categories"

})

module.exports = {
    BlogModel :  mongoose.model("Blog",Schema)
}