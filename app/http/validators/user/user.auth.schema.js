const Joi = require("joi");

const loginSchema = Joi.object({
    
    phoneNumber: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))

});
const confirmLoginSchema = Joi.object({
    
    phoneNumber: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد")),
    Code: Joi.string().min(4).max(6).error(new Error("کد وارد شده صحیح نمیباشد"))

});

module.exports = {
    loginSchema,
    confirmLoginSchema
}