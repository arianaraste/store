const {blogsController} = require("../../http/controller/admin/blogs.controller");
const { uploadFile } = require("../../utills/multer");
const {stringToArray} = require("../../http/middlewares/stringToArray");
const router = require("express").Router();

router.get("/get-all-blogs", blogsController.getAllBlog)
router.post("/create-blog",uploadFile.single("images"),stringToArray("tags"), blogsController.creatBlog);
router.get("/find-by-id/:ID", blogsController.getByIdBlog);
router.delete("/delete-by-id/:ID" , blogsController.deleteBlog);
router.patch("/update/:ID",uploadFile.single("cartimg"),stringToArray("tags"), blogsController.updateBlog);

module.exports = {
    blogRoutes : router
};
