const fs = require("fs");
const { UPLOAD_PATH } = require("../config/path");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    // 2.将user信息存到数据库中
    const result = await userService.create(user);
    // 3.查看存储的结果，告知前端创建成功
    ctx.body = {
      message: "创建用户成功！",
      data: result,
    };
  }
  async showAvatarImage(ctx,next) {
    const { userId } = ctx.request.params;
    
    const avatarInfo = await fileService.queryAvatarWithUserId(userId);
    const {filename,mimetype} = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);

  }
}

// 导出一个对象
module.exports = new UserController();
