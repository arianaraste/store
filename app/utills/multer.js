const multer = require("multer");
const path = require("path");
const {createRoute} = require("./function");
const errors = require("http-errors");
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null, filePath);
        }
        cb(null,null)
    },
    filename : (req, file, cb) => {
        if(file.originalname){
        const ext = path.extname(file.originalname);
        console.log(ext);
        const fileName = String(new Date().getTime() + ext);
        req.body.filename = fileName;
        console.log(req.body.filename);
        return cb(null , fileName);
        }
        cb(null,null)
    }
});
function fileFilter(req , file , cb){
    const ext = path.extname(file.originalname);
    if(![".jpg",".jpeg",".webp",".png"].includes(ext)){return cb(errors.BadRequest("file dose not correct"), flase)};
    return cb(null, true)
};
const maxFileSize = 1 * 1000 * 1000;
const uploadFile = multer({storage,fileFilter, limits : {fileSize : maxFileSize}});

module.exports = {
    uploadFile
}