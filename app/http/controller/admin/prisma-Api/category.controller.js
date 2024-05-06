const Controller = require("../../controllers");

class prismaCategory extends Controller {
    createCategory(){};
    categoryList(){};
    getCategoryById(){};
    updateCategory(){};
    deleteCategory(){};
};

module.exports = {
    prismaCategory : new prismaCategory()
}