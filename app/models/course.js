const { required, string } = require("joi");
const { default: mongoose, VirtualType } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const { text } = require("express");
const Episodes = new mongoose.Schema({
    title : {type: String , required : true},
    description : {type: String},
    time : {type: String , default : "00:00:00" },
    type : {type: String , default : "free"}

})
const Chapter = new  mongoose.Schema({
    title : {type: String , required : true},
    description : {type: String},
    Episodes : {type : [Episodes], default : [] },
    time : {type: String , default : "00:00:00"},
})
const Schema = new mongoose.Schema({

    title : {type : String , required : true},
    description : {type : String},
    text : {type : String},
    gallery : {type : [String]},
    tags : {type : [String]},
    category : {type : mongoose.Types.ObjectId , ref : "category", required: true},
    teacher : {type : mongoose.Types.ObjectId , ref : "user" , required : true},
    price : {type : Number , default : 0  , required: true},
    discount : {type : Number , default : 0},
    type : {type: String , defult : true,required: true},
    format : {type: String},
    comment : {type : [CommentSchema] , defult : []},
    bookmark : {type : [mongoose.Types.ObjectId] , defult : []},
    like : {type : [mongoose.Types.ObjectId] , defult : []},
    deslike : {type : [mongoose.Types.ObjectId] , defult : []},
    Students : {type : [mongoose.Types.ObjectId] , defult : []},
    time : {type: String , default : "00:00:00" ,  required : true},
    chapter : { type : [Chapter] , default : [] , }
},{
    toJSON : {
        virtuals : true
    }
});
Schema.index({title: "text", description: "text", text: "tex"})
module.exports = {
    courseModel :  mongoose.model("Course",Schema)
}