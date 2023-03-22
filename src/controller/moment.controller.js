const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 获取动态内容
    const { content } = ctx.request.body;

    // 获取登录者的ID
    const { id } = ctx.user;
    // 存储到数据库
    const result = await momentService.create(id, content);

    ctx.body = {
      code: 0,
      message: "创建用户动态成功~",
      data: result,
    };
  }
  async getList(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await momentService.getLists(limit, offset);

    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async detail(ctx, next) {
    const { momentId } = ctx.request.params;
    const result = await momentService.getDetail(momentId);

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.request.params;
    const { content } = ctx.request.body;

    const result = await momentService.update(momentId, content);

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.request.params;
    const result = await momentService.remove(momentId);

    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async addLabels(ctx, next) {
    const labels = ctx.labels;
    const { momentId } = ctx.request.params;
    try {
      for (const label of labels) {
        // 查询标签是否存在
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          // 1.不存在的话，插入
          const result = await momentService.addLabel(momentId, label.id);
        }
      }
      ctx.body = {
        message: "添加标签成功~",
        code: 0,
      };
    } catch (error) {
      console.log("error",error);
      ctx.body = {
        message: "添加标签失败~",
        code: -3001,
      };
    }
  }
}

module.exports = new MomentController();
