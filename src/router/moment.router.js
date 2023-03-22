const koaRouter = require("@koa/router");
const { create, getList,detail,update,remove,addLabels } = require("../controller/moment.controller");
const { verifyLabelExists } = require("../middleware/label.middleware");
const { verifyAuth } = require("../middleware/login.middleware");
const {verifyPermission} = require("../middleware/permission.middleware");

const momentRouter = new koaRouter({prefix: "/moment"});

// 编写接口
// 增加
momentRouter.post("/",verifyAuth,create);

// 查询
// 获取动态，不需要身份
momentRouter.get("/",getList);
// 获取某一条动态的详情
momentRouter.get("/:momentId",detail);

// 修改
momentRouter.put("/:momentId",verifyAuth,verifyPermission('moment'),update)

// 删除
momentRouter.delete("/:momentId",verifyAuth,verifyPermission('moment'),remove)
/* 
   给评论添加标签
   中间件：
     1.是否登录(完成)
     2.验证是否有操作资源的权限(完成)
     3.验证label的name是否已经存在与label表中
       * 如果存在，那么直接使用即可
       * 如果没有存在，那么需要先将label的name添加到label表
     4.最终步骤
       *所有的labels都在已经在label表中
       *存到moment_label表中
*/
momentRouter.post("/:momentId/labels",verifyAuth,verifyPermission("moment"),verifyLabelExists,addLabels);

module.exports = momentRouter;
