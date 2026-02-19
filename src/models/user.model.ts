import { ResultSetHeader } from 'mysql2';
import db from '../config/database.js';
import { UserType } from '../types/type.js';

const findAll = async () => {
  const query = 'SELECT * FROM user';
  const [result] = await db.execute(query);
  return result as UserType[];
};
//--------------------------------------------------------------------------------

const findOne = async (id: number) => {
  const query = 'SELCET * FROM user WHERE id = ?';
  const [result] = await db.execute(query, [id]);
  return result as UserType[];
};
//--------------------------------------------------------------------------------

const create = async (user: UserType): Promise<ResultSetHeader> => {
  const query = `INSERT INTO user (firstname, lastname, email, password, created_at,updated_at, festival_id) 
                 VALUES (?, ?, ?, ?, NOW(), NOW(), ?)`;

  const [result] = await db.execute<ResultSetHeader>(query, [
    user.firstname,
    user.lastname,
    user.email,
    user.hashedPassword,
    user.festival_id,
  ]);
  return result;
};
//--------------------------------------------------------------------------------

const update = async (id: number, data: UserType): Promise<ResultSetHeader> => {
  const query =
    'UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?, updated_at = NOW(), festival_id = ? WHERE id = ?';

  const [result] = await db.execute<ResultSetHeader>(query, [
    data.firstname,
    data.lastname,
    data.email,
    data.password,
    data.festival_id,
    id,
  ]);

  return result;
};
//--------------------------------------------------------------------------------

const deleted = async (id: number) => {
  const query = 'DELETE FROM user WHERE id = ?';
  const [result] = await db.execute(query, [id]);
  return result as ResultSetHeader;
};
//--------------------------------------------------------------------------------

export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
};
