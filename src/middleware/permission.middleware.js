const { OPERATION_NOT_ALLOWED } = require("../config/error-constants");
const permissionService = require("../service/permission.service");

const verifyPermission = function (resouce) {
  return async (ctx, next) => {
    const keyName = Object.keys(ctx.request.params)[0];
    const resouceId = ctx.request.params[keyName];
    const { id } = ctx.user;

    const permited = await permissionService.checkResouce(resouce,resouceId,id);

    if(!permited){
        return ctx.app.emit("error",OPERATION_NOT_ALLOWED,ctx)
    }
    
    // 如果验证通过，执行下一个中间件
    await next();
}
}

module.exports = {
  verifyPermission,
};
