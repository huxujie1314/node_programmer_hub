const fs = require("fs");
const path = require("path");

//  读取文件
// 默认情况下相对路径和node程序的启动路径有关系

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,"./keys/private.key"));
const PUBLIC_KEY= fs.readFileSync(path.resolve(__dirname,"./keys/public.key"));

module.exports = {
    PRIVATE_KEY,
    PUBLIC_KEY
}