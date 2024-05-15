const {  productModel } = require("../../../models/product");
const { createProductSchema } = require("../../validators/admin/product.schema");
const path = require("path");
const {deleteFileInPublic} = require("../../../utills/function");
const errors = require("http-errors");
class productController {
    async createProduct(req ,res, next){
        try {
            const productValidate = await createProductSchema.validateAsync(req.body);
            req.body.images = path.join(productValidate.fileUploadPath, productValidate.filename);
            const images = req.body.images;
            const {title, decription, tags, category, text, price, count, discount, type, length, height, width, weight, colors, madein} = req.body
            const supplier = req.user._id
            let features = {}
            if(!length){ features.length = 0}else{features.length = length};
            if(!height){ features.height = 0}else{features.height = height};
            if(!width){ features.weight = 0}else{features.width = width};
            if(!weight){ features.weight = 0}else{features.weight = weight};
            if(!colors){ features.colors = 0}else{features.colors = colors};
            if(!madein){ features.madein = 0}else{features.madein = madein};
            const product = await productModel.create({
                title,
                decription,
                text,
                tags,
                category,
                images,
                supplier,
                price,
                discount,
                count,
                type,
                features  
            });
            res.status(200).json({
                status : 200,
                message : "product created"
            })
        } catch (error) {
            deleteFileInPublic(req.body.images);
            console.log(error);
            next(error)
        }
    };
    async getAllProduct(req ,res ,next){
        try {
        const products = await productModel.find({});
        if(!products) throw errors.NotFound("didnt find any products");
        return res.status(200).json({
            data : {
                products
            }
        })
        } catch (error) {
            next(error)
        }
    };
    getProductById(){};
    updateProduct(){};
    deleteProduct(){};
};

module.exports = {
    productController : new productController()
}
