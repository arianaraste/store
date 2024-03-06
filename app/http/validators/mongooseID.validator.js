const Joi = require("joi");

const mongooseID_Validator = Joi.object({
    ID : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("    مقدار وارد شده صحیح نمی باشد    "))
});

module.exports = { 
    mongooseID_Validator
}