const { default: mongoose } = require("mongoose");
const CommentSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId , ref : "user" ,required: true},
    comment : {type : String,required: true},
    createdAt : {type : Date, default : 0},
    like : {type : [mongoose.Types.ObjectId] ,ref : "users", defult : []},
    deslike : {type :[mongoose.Types.ObjectId] ,ref : "users", defult : []},
    replay : {type :[mongoose.Types.ObjectId] ,ref : "users", defult : []},
}, {
    timestamps : {createdAt: true}
});
module.exports = {
    CommentSchema
}