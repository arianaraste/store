const { BlogSchema, BlogModel } = require("../../../models/blogs")
const errors = require("http-errors");
const Controller = require("../controllers");
const { creatBlogSchema } = require("../../validators/admin/creatblogSchema");
const { deleteFileInPublic } = require("../../../utills/function");
const path = require("path");
const { mongooseID_Validator } = require("../../validators/mongooseID.validator");
const {filterUpdateData} = require("../../../utills/function")
class blogsController extends Controller {

    async creatBlog(req , res , next){
        try {
            const blogValidate = await creatBlogSchema.validateAsync(req.body);
            req.body.cartimg = path.join(blogValidate.fileUploadPath, blogValidate.filename);
            const cartimg = req.body.cartimg;
            const {title, decription, tags, categories, body,gallery} = req.body
            const author = req.user._id
            const blog = await BlogModel.create({
                author,
                title,
                 decription,
                  tags,
                   categories,
                    body,
                     cartimg,
                      gallery
            });
            res.status(200).json({
                status : 200,
                message : "blog with succesfully uploded"
            })
        } catch (error) {
            deleteFileInPublic(req.body.cartimg);
            next(error)
        }
    };
    async getAllBlog(req , res , next){
        try {
             const Blogs = await BlogModel.aggregate([
                {
                    $match : {}
                },
                {
                    $lookup : {
                        from : "users",
                        foreignField: "_id",
                        localField: "author",
                        as : "author"
                    }
                },
                {
                    $unwind : "$author"
                },
                {
                    $lookup : {
                        from : "categories",
                        foreignField: "_id",
                        localField: "categories",
                        as : "categories"
                    }
                },
                {
                    $unwind : "$categories"
                },
                {
                    $project : {
                        "author.__v" : 0,
                        "categories.__v" : 0,
                        "author.OTP" : 0,
                        "author.discount_code" : 0,
                        "author.bills" : 0,
                        "__v" : 0

                    }
                }
                
             ])
             return res.status(200).json({
                status : 200 ,
                data : Blogs
             })
        } catch (error) {
            next(error)
        }
    };
    async getByIdBlog(req , res , next){
        try {
            const {ID} = req.params;
            console.log(ID);
            await mongooseID_Validator.validateAsync({ID})
            const Blog = await BlogModel.findOne({_id : ID}).populate([{path : "author" , select : {first_name  : 1 , last_name: 1 , profileImg : 1, Role : 1 } } , {path: "categories"}]);
            if(!Blog) throw errors.NotFound("didnt find any blogs");
            return res.status(200).json({   
                status : 400 ,
                data : {
                    Blog
                }
            })
            
                
        } catch (error) {
            next(error)
        }
    };
    async updateBlog(req , res , next){
        try {
            const {ID} = req.params;
            await mongooseID_Validator.validateAsync({ID});
            const blog = await BlogModel.findById(ID);
            if(!blog) throw errors.NotFound("blog NotFound");
            console.log(req.body.fileUploadPath,req.body.filename);
            if(req.body.cartimg) req.body.cartimg = path.join(req.body.cartimg.fileUploadPath , req.body.cartimg.filename)
            const updateData = req.body;

            let blackList = ["bookmark", "deslike", "like","comment", "author"];
            let badValues = ["", " ", 0, undefined, null, 0, "0",];
        
            Object.keys(updateData).forEach(key =>{
                if(updateData[key]== "string") updateData[key].trim();
                if(blackList.includes(updateData[key])) delete updateData[key];
                if(badValues.includes(updateData[key]))delete updateData[key];
            
            })

            const updateResult = await BlogModel.updateOne({_id : ID} , {$set : updateData});
            if(updateResult.modifiedCount == 0) throw errors.InternalServerError("didnt The blog was not updated");

            res.status(202).json({
                status : 202,
                message: "update blog accepted"
            })

        } catch (error) {
            console.log(error);

            deleteFileInPublic(req.body.cartimg)
            next(error)
        }
    };
    async deleteBlog(req , res , next){
        try {
            
            const {ID} = req.params;
            await mongooseID_Validator.validateAsync({ID})
            const blog = await BlogModel.findById(ID);
            if(!blog) throw errors.NotFound("didnt find the blog");
            const deleteBlog = await BlogModel.deleteOne({_id : ID});
            if(deleteBlog.deletedCount === 0 ) throw errors.BadRequest("didnt delete blog");
            return res.status(200).json({
                status : 200 ,
                message : "blog deleted"
            })

        } catch (error) {
            next(error)
        }
    };


}

module.exports = {
    blogsController : new blogsController()
}