const SECRET_KEY = "fdb0c388de01d545017cdf9ccf00eb72";
const REFRESH_SECRET_KEY = "e82ae7190fcc6b6f5b65f1c913a2ffbb"
const falseData = ["" , " ", null , 0 , undefined , "0" , NaN];
const Roles = {
    user : "USER",
    writer : "WRITER",
    admin : "ADMIN",
    teacher : "TEACHER",
    supplier : "SUPPKIER"
}
module.exports = {
    SECRET_KEY,
    REFRESH_SECRET_KEY,
    falseData
}