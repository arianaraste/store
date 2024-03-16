const { BlogSchema, BlogModel } = require("../../../models/blogs")
const errors = require("http-errors");
const Controller = require("../controllers");
const { creatBlogSchema } = require("../../validators/admin/creatblogSchema");
const { deleteFileInPublic } = require("../../../utills/function");
const path = require("path")
class blogsController extends Controller {

    async creatBlog(req , res , next){
        try {
            const blogValidate = await creatBlogSchema.validateAsync(req.body);
            console.log(blogValidate);
            req.body.cartimg = path.join(blogValidate.fileUploadPath, blogValidate.filename);
            const cartimg = req.body.cartimg;
            const {title, decription, tags, categories, body,gallery} = req.body
            const blog = await BlogModel.create({
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
            deleteFileInPublic(req.body.cartimg)
            next(error)
        }
    };
    async getAllBlog(req , res , next){
        try {
             const Blogs = await BlogSchema.find({});
             return res.status(200).json({
                status : 200 ,
                data : Blogs
             })
        } catch (error) {
            next(error)
        }
    };
    getByIdBlog(req , res , next){
        try {
                
        } catch (error) {
            next(error)
        }
    };
    updateBlog(req , res , next){
        try {
                
        } catch (error) {
            next(error)
        }
    };
    deleteBlog(req , res , next){
        try {
                
        } catch (error) {
            next(error)
        }
    };


}

module.exports = {
    blogsController : new blogsController()
}