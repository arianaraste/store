const { CategoriesModel } = require("../../../models/categories");
const { categorySchema } = require("../../validators/admin/categorySchema");
const errors = require("http-errors");
const { mongooseID_Validator } = require("../../validators/mongooseID.validator");
const Controller = require("../controllers");
class CategoryController extends Controller{

    async createCategory(req , res , next){
  
        try {
            await categorySchema.validateAsync(req.body);
            const {title , description , parent , img} = req.body;
            const category = await CategoriesModel.findOne({title: title});
            if(category) throw errors.Unauthorized("دسته بندی  تکراری است");
            const createcategory = await CategoriesModel.create({title , description , parent, img});
            if(!createcategory) throw errros.Unauthorized("دسته بندی ایجاد نشد");
            return res.status(201).send("دسته بندی ایجاد شد")

        } catch (error) {
            next(errors.BadRequest(error.message))
        };
    };
    async getCategoryByID(req , res , next){
        try {
        const {ID} = req.params;
        await mongooseID_Validator.validateAsync({ID})
        const category = await CategoriesModel.findById(ID, {__v : 0 , _id : 0});
        if(!category) throw errors.NotFound("دسته بندی یافت نشد");
        return res.status(200).json({
            statusCode : 200,
            data : category
        })

        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    };
    async getAllCateorywhitpopulate(req , res , next){
        try {
            const category = await CategoriesModel.find({});
            console.log(category);
            if(!category) throw errors.NotFound("دسته بندی ایی وجود ندارد");
            return res.status(200).json({
                statusCode: 200,
                data : {
                    category
                }
            })
        
        } catch (error) {
            console.log(error);
            next(error)
        }
        
    }
    async getAllCategoryWhitOutputPopulate(req , res , next){
        try {
            const category = await CategoriesModel.aggregate([{
                $match : {}
            }]);
            return res.status(200).json({
                    status : 200, 
                    categories : category
                })
        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    };
    async getSubCategory(req , res , next){
        try {
        const category = await CategoriesModel.find({parent : undefined}, {__v : 0});
        return res.status(200).json({
            status : 200 ,
            data : category
        })
        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    };
    async getAllParentsCategory(req , res , next){
        try {
            const parentsategories = await CategoriesModel.find({parent : undefined}, {__v : 0});
            return res.status(200).json({
                status : 200,
                category : parentsategories
            })
        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    };
    async getAllChildeCategory(req , res ,next){
        try {
            const childerns = await CategoriesModel.find({"parent" : {$exists : true}} , {__v : 0});
            if(!childerns) throw errors.NotFound("دسته بندی فرزندی وجود ندارد");
            return res.status(200).json({
                status: 200 ,
                category: childerns
            })
        } catch (error) {
            next(errors.BadRequest(error.message))
        }
    };
    
    async updateCategory(req , res , next){
        try {
        const {ID} =  req.params ;
        const category = await CategoriesModel.findById(ID);
        if(!category) throw errors.NotFound("دسته بندی یافت نشد")
        await mongooseID_Validator.validateAsync({ID})
        console.log(ID);
        const {title , description,parent,img } = req.body;
        const updateCategory = await CategoriesModel.updateOne({_id : ID} , {$set : {
            title : title ,
            description : description,
            parent : parent,
            img : img
        }});
        console.log(updateCategory);
        if(updateCategory.modifiedCount === 0 ) throw errors.InternalServerError("دسته بندی بروزرسانی نشد");
        return res.status(200).json({
            status : 200 ,
            message : "دسته بندی با موفقیت آپدیت شد"
        })
        } catch (error) {
            next(errors.BadRequest(error.message))
        }
        
    };
    async removeCategory(req , res , next){
        
        try {
        const {ID} = req.params;
        await mongooseID_Validator.validateAsync({ID})
        const category = await CategoriesModel.findById(ID);
        if(!category) throw errors.NotFound("دسته بندی یافت نشد")
        const deleteCategory = await CategoriesModel.deleteMany({$or : [
            {_id : category._id},
            {parent : category._id}
        ]});
        if(deleteCategory.deletedCount === 0) throw errors.InternalServerError("دسته بندی حذف نشد");
        return res.status(200).json({
            status : 200 ,
            message : "category deleted"
        })
        } catch (error) {
            next(errors.BadRequest(error.message))
        }

    };
    
    addImageCategory(){};
};

module.exports = {
    CategoryController : new CategoryController()
}
