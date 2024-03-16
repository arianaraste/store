const Joi = require("joi");

const creatBlogSchema = Joi.object({
    title : Joi.string().required().min(1).max(60).error(new Error("title is not correct")),
    decription : Joi.string().error(new Error("description isnt string")),
    body : Joi.string().error(new Error("body isnt string")),
    tags : Joi.array().error(new Error("tags has problem")),
    categories : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("objectid has problem")),
    cartimg : Joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp)$/).error(new Error("cartimg isnt string")),
    gallery : Joi.array().length(20).error(new Error("gallery must be 20 index")),
    fileUploadPath : Joi.allow(),
    filename : Joi.allow()
}) ;

module.exports = {
    creatBlogSchema
}