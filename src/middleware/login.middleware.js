const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXIST,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED
} = require("../config/error-constants");
const { PUBLIC_KEY } = require("../config/screct");
const md5password = require("../utils/md5-password");
const userService = require("../service/user.service");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 1. 检查用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2. 判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  const user = users[0];

  if (!user) {
    return ctx.app.emit("error",NAME_IS_NOT_EXIST, ctx);
  }

  // 3.判断用户传递的密码和数据库中的密码是否一致
  if(user.password !== md5password(password)){
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT ,ctx)
  }
  ctx.user = user;
  
  await next();
};

const verifyAuth = async (ctx,next) =>{
   //  获取token
   const authorization = ctx.headers.authorization;
   if(!authorization){
    ctx.app.emit("error",UNAUTHORIZED,ctx);
   }
   const token = authorization.replace("Bearer ", "");

   try {
     const result = jwt.verify(token,PUBLIC_KEY,{
       algorithms: ["RS256"]
     });

     // 将token信息保存下来
     ctx.user = result;
     // 执行下一个中间件
     await next();
   } catch (error) {
     console.log(error);
     ctx.app.emit("error",UNAUTHORIZED,ctx);
   }
}

module.exports = {
  verifyLogin,
  verifyAuth
};
