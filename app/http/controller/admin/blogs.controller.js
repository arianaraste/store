const blogs = require("../../../models/blogs");
const { BlogSchema } = require("../../../models/blogs")
const errors = require("http-errors");
const Controller = require("../controllers");
class blogsController extends Controller {

    creatBlog(req , res , next){
        try {
                
        } catch (error) {
            next(error)
        }
    };
    async getAllBlog(req , res , next){
        try {
             const Blogs = await BlogSchema.find({});
             if (!blogs) throw errors.NotFound("any blog does not exist");
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