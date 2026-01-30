import DB from '../config/database.js';

const findAll = async () => {
    const query = "select * from user";
    const  [rows] = await DB.execute(query)
    return rows;
}

const findOne = async (id: string | string[]) => {
    const query = "select * from user where id = ?";
    const  [rows] = await DB.execute(query, [id])
    return rows;
}
 
export default {
    findAll,
    findOne
}