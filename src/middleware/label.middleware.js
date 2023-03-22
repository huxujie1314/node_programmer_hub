const labelService = require("../service/label.service");

const verifyLabelExists = async(ctx,next)=>{
    // 1. 先获取用户传过来的labels
    const { labels } = ctx.request.body;

    // 2.判断labels是否存在于表中了
    const newLabels = [];
    for (const name of labels) {
        const result = await labelService.queryLabelByName(name);
        const labelObj = { name };
        if(result){
            labelObj.id = result.id;
        }else {
            // 插入label表中
            const insertRes = await labelService.create(name);
            labelObj.id = result.insertId;
        }
        newLabels.push(labelObj);
    }
    ctx.labels = newLabels;

    await next();
}


module.exports = {
    verifyLabelExists
}