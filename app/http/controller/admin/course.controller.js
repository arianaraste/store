const { CourseSchema, courseModel } = require("../../../models/course");
const Controller = require("../controllers");
const statusCode = require("http-status-codes");
const errors = require("http-errors")
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
    createCourse(req, res, next){
        try {
            let course;
            const body = req.body;
            Object.keys(body).forEach(key => log.key)
            console.log(course);
            

        } catch (error) {
            next(error)
        }
    };
    deleteCourse(){};
    updateCourse(){};
};

module.exports = {
    courseController : new courseController()
}