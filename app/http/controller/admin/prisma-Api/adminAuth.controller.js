const Controller = require("../../controllers");

class prismaAdmin extends Controller {
    login(){};
    register(){};
    logOut(){};
    deleteAccount(){};
};

module.exports = {
    prismaAdmin : new prismaAdmin()
}