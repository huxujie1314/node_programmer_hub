const connection = require("../app/database");

class UserService {
  // 和数据库打交道的
  async create(user) {
    // 把数据库的操作分离开来
    // 将user对象保存到数据库中
    const { name: username, password } = user || {};
    //  拼接statement
    const statement = 'insert into user (name,password) values(?,?);';

    const [result] = await connection.execute(statement,[username,password]);
    return result;
  }

  async findUserByName(name){
    const statement = 'select * from user where name =?;';

    const [values] = await connection.execute(statement,[name]);
    return values;
  }

  // 更新用户头像
  async updateAvatar(avatarUrl,userId){
    const statement = `update user set avatar_url = ? where id =?;`;
    const [result] = await connection.execute(statement,[avatarUrl,userId]);
    return result;
  }
}

module.exports = new UserService();
