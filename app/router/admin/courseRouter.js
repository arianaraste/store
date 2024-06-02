const { courseController } = require("../../http/controller/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const course = require("../../models/course");
const { uploadFile } = require("../../utills/multer");

const router = require("express").Router();

router.get("/list", courseController.getListOfCoures);
router.post("/create-course",uploadFile.single("image"), stringToArray("tags"),courseController.createCourse);
router.patch("/update/:ID", courseController.updateCourse);
router.put("/add-chapter", courseController.addChapter);

module.exports = {
    courseRouter :  router
}