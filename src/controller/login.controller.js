const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;
    try {
      // 生成token
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        // 过期时间
        expiresIn: 60 * 60 * 24,
        algorithm: "RS256",
      });
      // 颁发令牌，传入token
      ctx.body = { code: 0, data: { token, id, name } };
    } catch (error) {
      console.log(error);
      ctx.body = {
        data: error,
      };
    }
  }

  test(ctx, next) {
    ctx.body = "验证身份通过~";
  }
}

// 导出实例对象
module.exports = new LoginController();
