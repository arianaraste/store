const { CategoryController } = require("../../http/controller/admin/category.controller");
const router = require("express").Router();

router.post("/create-category" , CategoryController.createCategory);
router.get("/find-by-id/:ID" , CategoryController.getCategoryByID);
router.patch("/patch-category/:ID" , CategoryController.updateCategory);
router.delete("/delete-category/:ID" , CategoryController.removeCategory);
router.get("/list-of-categories-with-populate"  , CategoryController.getAllCateorywhitpopulate);
router.get("/list-of-categories-with-out-populate" , CategoryController.getAllCategoryWhitOutputPopulate);
router.get("/get-all-sub-category", CategoryController.getSubCategory);
router.get("/get-all-parents-of-category", CategoryController.getAllParentsCategory);
router.get("/get-all-childern-of-category", CategoryController.getAllChildeCategory);

module.exports = {
    categoryRoutes : router
}