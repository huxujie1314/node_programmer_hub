const { SERVER_PORT } = require("./config/server");
const app = require("./app");
require("./utils/handle-error");

// 开启服务器，监听端口
app.listen(SERVER_PORT, () => {
  console.log("coderhub服务器开启成功~");
});
