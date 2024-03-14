const { default: mongoose } = require("mongoose");
function autopopulate(next){
    this.populate([{path : "children" , Selection : {__v : 0 , id: 0}}]);
    return next()
}
const Schema = new mongoose.Schema({

    title : {type : String , required : true},
    description : {type : String},
    parent : {type: mongoose.Types.ObjectId ,ref : "Categories", default : undefined},
    img : {type : String}

},{
    toJSON : {
        id : 0,
        virtuals : true
    }
});
Schema.virtual("children" , {
    ref : "Categories",
    localField : "_id",
    foreignField : "parent"
})
Schema.pre("find", autopopulate).pre("findone", autopopulate);


module.exports = {
    CategoriesModel:  mongoose.model("Categories",Schema)
}