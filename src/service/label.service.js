const connection = require("../app/database");

class LabelService {
    async create(name){
        const statement =`insert into label (name) values (?)`;
        const [result] = await connection.execute(statement,[name]);
        return result;
    }

    async queryLabelByName(name){
        const statement = 'select * from label where name = ?;';
        const [result] = await connection.execute(statement,[name]);
        return result[0];
    }

}

module.exports = new LabelService();