const connection = require("../app/database");

class MomentService {
  async create(userId, content) {
    // 定于预编译语句
    const statement = "insert into moment (content,user_id) values(?,?);";
    const [result] = await connection.execute(statement, [content, userId]);

    return result;
  }

  async getLists(limit = 10, offset = 0) {
    // 定于预编译语句
    const statement = `
    SELECT
    m.id id,m.content content,m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id',u.id,'name', u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) user,
    (SELECT COUNT(*) FROM comment c  WHERE c.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label ml  WHERE ml.moment_id = m.id) labelCount
  FROM
    moment m
    LEFT JOIN user u ON m.user_id = u.id 
    LIMIT ? OFFSET ?;
    `;
    const [result] = await connection.execute(statement, [limit, offset]);

    return result;
  }

  async getDetail(id) {
    const statement =`
    SELECT
      m.id id,
      m.content content,
      m.createAt createTime,
      m.updateAt updateTime,
      JSON_OBJECT( 'id', u.id, 'name', u.NAME,'avatarUrl',u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt ) user,
      (
        SELECT
        JSON_ARRAYAGG(JSON_OBJECT(
          'id',c.id,'content',c.content,'contentId', c.comment_id,
          'user', JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url)
        ))
        FROM comment c 
        LEFT JOIN user cu ON c.user_id = cu.id
        WHERE c.moment_id = m.id
      ) comments,
      ( JSON_ARRAYAGG( JSON_OBJECT( 'id', l.id, 'name', l.NAME )) ) labels 
    FROM
      moment m
      LEFT JOIN USER u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON m.id = ml.moment_id
      LEFT JOIN label l ON l.id = ml.label_id 
    WHERE
      m.id = ? 
    GROUP BY
      m.id;
    `;
    const [result] = await connection.execute(statement, [id]);

    return result;
  }
  async update(id, content) {
    const statement = "UPDATE moment set content = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [content, id]);

    return result;
  }

  async remove(id) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);

    return result;
  }

  async hasLabel(momentId,labelId){
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement,[momentId,labelId]);

    return !!result.length;
  }
  // 插入标签
  async addLabel(momentId,labelId){
    const statement = `insert into moment_label (moment_id, label_id) values (?,?);`;
    const [result] = await connection.execute(statement,[momentId,labelId]);

    return result;
  }
}

module.exports = new MomentService();
