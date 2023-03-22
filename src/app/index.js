const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router");

// 创建服务器
const app = new koa();

app.use(bodyParser());

registerRouters(app);


module.exports = app;
