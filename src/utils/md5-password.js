const crypto = require("crypto");

function md5password(pwd) {
    const md5 = crypto.createHash("md5");
    // 转成16进制
    const md5pwd= md5.update(pwd).digest('hex');

    return md5pwd;
}

module.exports = md5password;