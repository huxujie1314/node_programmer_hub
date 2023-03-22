const userService = require("../service/user.service");
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error-constants");
const md5password = require("../utils/md5-password");

const verifyUser = async (ctx, next) => {
  // 1.判断用户是否已经存在
  // 1.1 验证用户名和密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx);
  }
  // 1.2 判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error",NAME_IS_ALREADY_EXISTS, ctx);
  }
  await next();
};

const handlePassword = async(ctx, next)=>{
  // 取出密码
  const { password } = ctx.request.body;
  
  ctx.request.body.password = md5password(password);

  await next();
}

module.exports = {
    verifyUser,
    handlePassword
}
