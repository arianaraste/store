const Joi = require("joi");
const errors = require("http-errors")
const { CategoriesModel } = require("../../../models/categories");
const categorySchema = Joi.object({
    
    title : Joi.string().min(3).max(16).required().error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    description : Joi.string().min(0).max(500).error(new Error("مقدار توضیحات عنوان وارد شده بیش از حد مجاز  است")),
    parent : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("دسته بندی مادر نادرست است"))

});

module.exports = {
    categorySchema
}