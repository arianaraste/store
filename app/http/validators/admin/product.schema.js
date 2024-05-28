const createError = require("http-errors");
const Joi = require("joi");
const { Schema } = require("mongoose");

const createProductSchema = Joi.object({
    title : Joi.string().min(1).max(60).error(createError.BadRequest("title is not correct")),
    description : Joi.string().error(createError.BadRequest("description isnt string")),
    text : Joi.string().error(createError.BadRequest("body isnt string")),
    tags : Joi.array().min(0).max(20).error(createError.BadRequest("tags has problem")),
    category : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(createError.BadRequest("objectid has problem")),
    price:  Joi.number().error(createError.BadRequest("price is not number")),
    discount : Joi.number().error(createError.BadRequest("dicount isnt number")),
    count : Joi.number().error(createError.BadRequest("cout isnt number")),
    images : Joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp)$/).error(new Error("images isnt string")),
    weight: Joi.number().allow("",null).error(createError.BadRequest("input weight is not correct")),
    length: Joi.number().allow("",null).error(createError.BadRequest("input length is not correct")),
    height: Joi.number().allow("",null).error(createError.BadRequest("input height is not correct")),
    width: Joi.number().allow("",null).error(createError.BadRequest("input weidth is not correct")),
    type: Joi.string().allow("",null).regex(/(virtual|phisical)/i).allow("",null),
    colors : Joi.string().allow("",null),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    createProductSchema
}