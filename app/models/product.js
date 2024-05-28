const { required, string } = require("joi");
const { default: mongoose, VirtualType } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({

    title : {type : String , required : true},
    description : {type : String},
    text : {type : String},
    images : {type : [String] , defult: []},
    tags : {type : [String]},
    category : {type : mongoose.Types.ObjectId , ref : "category", required: true},
    supplier : {type : mongoose.Types.ObjectId , ref : "user" , required : true},
    price : {type : Number , default : 0  , required: true},
    discount : {type : Number , default : 0},
    count : {type : Number },
    type : {type: String , required: true},
    format : {type: String},
    features : {type: Object, default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        madein : ""
    }},
    color: {type: String, default: "none"},
    comment : {type : [CommentSchema] , defult : []},
    bookmark : {type : [mongoose.Types.ObjectId] , defult : []},
    like : {type : [mongoose.Types.ObjectId] , defult : []},
    deslike : {type : [mongoose.Types.ObjectId] , defult : []},
    customers : {type : [mongoose.Types.ObjectId] , defult : []}
},{
    toJSON : {
        virtuals : true
    }
});
Schema.index({
    title: "text",
    description: "text",
    text: "text",
})
module.exports = {
    productModel :  mongoose.model("Product",Schema)
}