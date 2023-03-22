const koaRouter = require("@koa/router");
const { create,showAvatarImage } = require("../controller/user.controller");
const { verifyUser,handlePassword } = require("../middleware/user.middleware");
// 注册路由对象
const userRouter = new koaRouter({ prefix: "/users" });

// 用户注册接口

userRouter.post("/",verifyUser,handlePassword, create);

userRouter.get('/avatar/:userId',showAvatarImage)

module.exports = userRouter;
