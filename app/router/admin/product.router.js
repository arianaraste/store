const {productController} = require("../../http/controller/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utills/multer");

const router = require("express").Router();


router.post("/create-product", uploadFile.array("images",10), stringToArray("tags"), productController.createProduct);
router.get("/product-list", productController.getAllProduct);
router.get("/find-by-id/:ID", productController.getProductById);
router.delete("/remove/:ID", productController.deleteProduct);
router.patch("/update/:ID", uploadFile.array("images" , 10), stringToArray("tags", "color"), productController.updateProduct)




module.exports = {
    productRoutes : router
}