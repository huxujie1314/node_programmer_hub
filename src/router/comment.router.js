const koaRouter = require("@koa/router");
const { create,reply, remove } = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");

const commentRouter = new koaRouter({prefix: "/comment"});

commentRouter.post('/',verifyAuth,create);
// 回复评论的评论
commentRouter.post('/reply',verifyAuth,reply);

// 删除评论
commentRouter.delete("/:commentId",verifyAuth,verifyPermission('comment'),remove)



module.exports = commentRouter;