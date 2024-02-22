const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    ProductDashbord : {type : [mongoose.Types.ObjectId] , default : []},
    bookmarks : {types : [mongoose.Types.ObjectId] , defult : []},
});

module.exports = {
    ProfileSchema :  mongoose.model("profile",Schema)
}