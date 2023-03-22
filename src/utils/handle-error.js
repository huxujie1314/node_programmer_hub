const app = require("../app");
const {
  PASSWORD_IS_INCORRECT,
  NAME_IS_NOT_EXIST,
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  UNAUTHORIZED,
  OPERATION_NOT_ALLOWED
} = require("../config/error-constants");

app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      message = "用户名或者密码不能为空";
      code = -1001;
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经存在";
      break;
    case NAME_IS_NOT_EXIST:
      code = -1003;
      message = "用户名不存在";
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004;
      message = "密码错误";
      break;
    case UNAUTHORIZED:
      code = -1005;
      message = "无效的token或者已经过期~";
      break;
    case OPERATION_NOT_ALLOWED:
        code = -2001;
        message = "没有操作该资源的权限或者资源不存在~";
        break;
  }
  ctx.body = {
    code,
    message,
  };
});
