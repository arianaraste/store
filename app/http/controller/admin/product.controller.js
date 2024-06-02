const {  productModel } = require("../../../models/product");
const { createProductSchema } = require("../../validators/admin/product.schema");
const path = require("path");
const {deleteFileInPublic, ListOfImagesFromRequest, setFeatures, deleteInvalidPropertyOnObject, copyObject} = require("../../../utills/function");
const errors = require("http-errors");
const { mongooseID_Validator } = require("../../validators/mongooseID.validator");
const { default: mongoose } = require("mongoose");
const statusCode = require("http-status-codes");
const BlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
  };
Object.freeze(BlackList);
class productController {
    async createProduct(req ,res, next){
        try {
            const productValidate = await createProductSchema.validateAsync(req.body);
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const {title, decription, tags, category,
                 text, price, count, discount,
                  type} = req.body
            let features = setFeatures(req.body);
            const supplier = req.user._id;
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
        const search = req.query.search;
        let product;
        if(search){
            product = await productModel.find({
                $text:{
                    $search : new RegExp(search ,"ig")
                }
            })
        }else{
            product = await productModel.find({});
            if(!product) throw errors.NotFounduk("didnt find any products");
        };
        console.log(product);
        return res.status(statusCode.OK).json({
            data : {
                product
            }
        })
        } catch (error) {
            next(error)
        }
    };
    async getProductById(req, res, next){
        try {
        const {ID} = req.params;
        await mongooseID_Validator.validateAsync({ID});
        const product = await productModel.findById(ID);
        if(!product) throw errors.NotFound("product not found");
        return res.status(200).json({
            product
        })
        } catch (error) {
            console.log(error);
            next(error)
        }
    };
    async updateProduct(req, res, next){ 
        try {
        const {ID} = req.params;
        mongooseID_Validator.validateAsync({ID});
        const product = await productModel.findById(ID);
        if(!product) throw {status: statusCode.NOT_FOUND, message: "didnt find any product"};

        
        const body = copyObject(req.body);
        body.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
        body.features = setFeatures(req.body); 
        
        let ProductBlackList  = Object.values(BlackList);
        deleteInvalidPropertyOnObject(body, ProductBlackList);

        const updateResult = await productModel.updateOne({_id : product._id}, {$set: body});
        if(updateResult.modifiedCount == 0) throw {status: statusCode.INTERNAL_SERVER_ERROR, message: "server error"};
        return res.status(statusCode.OK).json({
            status: statusCode.OK,
            message: "product updated"
        })
        } catch (error) {
            console.log(error);
            next(error)
        }
    };
    async deleteProduct(req, res, next){
        try {
            const {ID} = req.params;
            await mongooseID_Validator.validateAsync({ID})
            const product = await productModel.findById(ID);
            if(!product) throw errors.NotFound("product not found");
            const removeProduct = await productModel.deleteOne({_id: ID});
            if(removeProduct.deletedCount === 0 ) throw errors.InternalServerError("internal server error");
            return res.status(200).json({
                status : 200,
                message : "product deleted"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    };
};

module.exports = {
    productController : new productController()
}
