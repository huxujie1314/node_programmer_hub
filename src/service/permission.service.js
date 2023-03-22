const connection = require("../app/database");

class PermissionService {
    async checkResouce(resouce,resouceId,id){
        const statement = `SELECT * from ${resouce} WHERE id = ? AND user_id = ?;`;
        const [result] = await connection.execute(statement,[resouceId,id]);
        return !!result.length;
    }
}


module.exports = new PermissionService();