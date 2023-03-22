const fileService = require("../service/file.service");
const userService = require("../service/user.service");


class FileController {
   async create (ctx,next){
    const { filename, mimetype ,size } = ctx.request.file
    const { id } = ctx.user;
    const result = await fileService.create(filename, mimetype ,size, id);
    
    // 3.将用户头像存在到用户表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    const result2 = await userService.updateAvatar(avatarUrl,id)
    
    ctx.body = {
        code: 0,
        message: "头像上传成功~",
        data: result
    };
   }
}


module.exports = new FileController();