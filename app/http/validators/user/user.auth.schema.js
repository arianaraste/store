const Joi = require("joi");

const authSchema = Joi.object({
    
    phoneNumber: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))

});

module.exports = {
    authSchema
}