const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({

    title : {type : String , required : true},
    description : {type : String},
    parent : {type: mongoose.Types.ObjectId , default : undefined},
    img : {type : String}

});

module.exports = {
    CategoriesModel:  mongoose.model("Categories",Schema)
}