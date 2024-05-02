const errors = require("http-errors");
function checkRole(AccsesRole){
    return function(req,res,next){
        try {
            const userRole = req.user.Role;
            if(AccsesRole !== userRole)throw errors.Forbidden("You do not have access to this section");
            return next()
        } catch (error) {
            next(error)
        }
    }
};
module.exports = {
    checkRole
}
