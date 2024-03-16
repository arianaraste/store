const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {createRoute} = require("./function");
const errors = require("http-errors")
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        const filePath = createRoute(req);
        cb(null, filePath);
    },
    filename : (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = String(new Date().getTime() + ext);
        req.body.filename = filename
        cb(null , filename)
    }
});
function fileFilter(req , file , cb){
    const ext = path.extname(file.originalname);
    if(![".jpg",".jpeg",".webp",".png"].includes(ext)) return cb(errors.BadRequest("file dose not correct"));
    return cb(null , true)
}
const uploadFile = multer({storage,fileFilter});

module.exports = {
    uploadFile : uploadFile
}