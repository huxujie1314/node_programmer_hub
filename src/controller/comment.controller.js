const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.create(content, momentId, id);
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.reply(content, momentId, commentId, id);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async remove(ctx, next) {
    const { commentId } = ctx.request.params;
    const result = await commentService.remove(commentId);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new CommentController();
