const labelservice = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    // 操作数据库

    const result = await labelservice.create(name);

    ctx.body = {
      code: 0,
      data: result,
      message: "创建标签成功~",
    };
  }
}

module.exports = new LabelController();
