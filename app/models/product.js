const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({

    title : {type : String , required : true},
    description : {type : String},
    gallery : {type : [String]},
    seller : {type : mongoose.Types.ObjectId},
    price : {type : Number , default : 0  , required: true},
    discount : {type : Number , default : 0},
    amount : {type : Number , defult : 0 },
    Property : {type : [Object] , default : { 
        icon : "" ,
        title : "",
        description: "",
    }},
    bookmark : {type : [mongoose.Types.ObjectId] , defult : []},
    like : {type : [mongoose.Types.ObjectId] , defult : []},
    deslike : {type : [mongoose.Types.ObjectId] , defult : []},
    customers : {type : [mongoose.Types.ObjectId] , defult : []}
});

module.exports = {
    ProductSchema :  mongoose.model("Product",Schema)
}