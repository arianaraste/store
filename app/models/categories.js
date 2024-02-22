const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({

    title : {type : String , required : true},
    description : {type : String},
    img : {type : String}

});

module.exports = {
    CategoriesSchema :  mongoose.model("Categorie",Schema)
}