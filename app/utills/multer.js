const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {createRoute} = require("./function");
const errors = require("http-errors")
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            cb(null, filePath);
        }
        cb(null,null)
    },
    filename : (req, file, cb) => {
        if(file?.originalname){
        const ext = path.extname(file.originalname);
        const filename = String(new Date().getTime() + ext);
        req.body.filename = filename;
        cb(null , filename);
        }
        cb(null,null)
    }
});
function fileFilter(req , file , cb){
    const ext = path.extname(file.originalname);
    if(![".jpg",".jpeg",".webp",".png"].includes(ext)) return cb(errors.BadRequest("file dose not correct"));
    return cb(null , true)
};
const maxFileSize = 1 * 1000 * 1000;
const uploadFile = multer({storage,fileFilter, limits : {fileSize : maxFileSize}});

module.exports = {
    uploadFile : uploadFile
}