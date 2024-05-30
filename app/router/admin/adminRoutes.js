const { blogRoutes } = require("./blogsRoutes");
const {categoryRoutes} = require("./categoryRoutes");
const { courseRouter } = require("./courseRouter");
const { productRoutes } = require("./product.router");

const router = require("express").Router();

router.use("/category",categoryRoutes);
router.use("/blog" , blogRoutes);
router.use("/product", productRoutes);
router.use("/course", courseRouter);

module.exports = {
    AdminRoutes : router
}