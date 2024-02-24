const errors = require("http-errors");
const { authSchema } = require("../../validators/user/user.auth.schema");
class UserAuthController {
    async login(req , res , next){
        try {
            console.log(req.body);
            const body = await authSchema.validateAsync(req.body);
            return res.status(200).send("ورود شما با موفقیت انجام شد")
        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    }
};

module.exports = {
    UserAuthController : new UserAuthController()
}
