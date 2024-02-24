const { authSchema } = require("../../validators/user/user.auth.schema");
const Controller = require("../controllers");
const errors = require("http-errors")

module.exports = new class HomeController extends Controller {
    async indexpage(req , res ,next){
       try {
        res.status(200).send("indexpage")
       } catch (error) {
        next(error)
       }
    }
};


