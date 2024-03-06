const { CategoriesModel } = require("../../../models/categories");
const { categorySchema } = require("../../validators/admin/categorySchema");
const errors = require("http-errors")
class CategoryController {

    async addCategory(req , res , next){
  
        try {
            
            await categorySchema.validateAsync(req.body);
            const {title , description , parent , img} = req.body;
            const createcategory = await CategoriesModel.create({title , description , parent, img});
            if(!createcategory) throw errros.Unauthorized("دسته بندی ایجاد نشد");
            return res.status(201).send("دسته بندی ایجاد شد=")

        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    };
    getCategoryByID(){};
    getAllCategory(){};
    //update whit objectid => category
    updateCategory(){};
    deleteCategory(){};
    addImageCategory(){};
};

module.exports = {
    CategoryController : new CategoryController()
}
