const { CourseSchema, courseModel } = require("../../../models/course");
const Controller = require("../controllers");
const {StatusCodes: statusCode} = require("http-status-codes");
const errors = require("http-errors");
const { createCourseSchema } = require("../../validators/admin/course.schema.js");
const path = require("path");
const { mongooseID_Validator } = require("../../validators/mongooseID.validator.js");
class courseController extends Controller {
    async getListOfCoures(req, res, next){
        try {
            let course;
            const {search} = req.query;
            if(search) course = await courseModel.find({$text : {$search : search}});
            course = await courseModel.find({}).sort({_id : -1});
            console.log(course);
            if(!course) throw errors.NotFound("can not found any course");
            return res.status(statusCode.OK).json({
                course
            })
        } catch (error) {
            next(error);
            console.log(error);
        }
    };
    async getCourseById(req, res, next){
        try {
            const {ID} = req.param;
            const course = await courseModel.findById(ID);
            if(!course) throw errors.NotFound("can not found course");
            return res.status(statusCode.OK).json({
                course
            })
        }catch(error) {
            next(error)
        }
    };
    async createCourse(req, res, next){
        try {
            const courseValidator = await createCourseSchema.validateAsync(req.body);
            const {title, description, text, tags, category, price, discount, count, type,} = req.body;
            const {fileUploadPath, filename} = req.body;
            const teacher = req.user._id;
            const image = path.join(fileUploadPath, filename);
            if(Number(price) > 0 && type === "free") throw errors.BadRequest("دوره رایگان نمیتواند قیمت گذاری شود")
            const createCourse = await courseModel.create({title,
                 description,
                  text,
                   tags,
                    category,
                     price,
                      discount,
                       count,
                        type,
                         teacher,
                         image
                    });
                    if(!createCourse._id) throw errors.InternalServerError("create course faild")
                    return res.status(statusCode.CREATED).json({
                        status: statusCode.CREATED,
                        message: "Course created successfully"
                })
        } catch (error) {
            console.log(error);
            next(error)
        }
    };
    async addChapter(req, res ,next){
        try {
            const {ID, title, text} = req.body;
            await mongooseID_Validator.validateAsync({ID})
            const course = await courseModel.findById(ID);
            if(!course) throw {status : statusCode.NOT_FOUND, message : "can not find any course"};
            const addChapter = await courseModel.updateOne({_id : ID},{$push :{
                chapter : {
                    title,text,Episodes : [], time : "00:00:00"
                }
            }});
            if(addChapter.modifiedCount == 0) throw {status : statusCode.BAD_REQUEST , message : "update chapter faild"};
            return res.status(statusCode.OK).json({
                statusCode : statusCode.OK,
                data : {
                    message : "chapter updated"
                }
            })
     
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    deleteCourse(){};
    updateCourse(){};
};

module.exports = {
    courseController : new courseController()
}