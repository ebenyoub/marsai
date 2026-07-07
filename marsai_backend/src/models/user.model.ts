import { ResultSetHeader } from 'mysql2';
import db from '../config/database.js';
import { UserRow, UserType } from '../types/type.js';
import { updateEntity } from '../utils.js';

const findAll = async (): Promise<UserRow[]> => {
  const query = 'SELECT * FROM user';
  const [rows] = await db.execute<UserRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<UserRow | null> => {
  const query = 'SELECT * FROM user WHERE id = ?';
  const [result] = await db.execute<UserRow[]>(query, [id]);
  return result.length > 0 ? result[0] : null;
};

const findByEmail = async (email: string): Promise<UserType | null> => {
  const query = 'SELECT * FROM user WHERE email = ?';
  const [result] = await db.execute<UserRow[]>(query, [email]);
  return result.length > 0 ? result[0] : null;
};

const columns: (keyof UserType)[] = ['firstname', 'lastname', 'email', 'password', 'role', 'festival_id'];

const update = async (id: number, data: Partial<UserType>): Promise<ResultSetHeader> => {
  return updateEntity('user', id, data, columns, db, { hasTimestamp: true });
};

const deleted = async (id: number): Promise<ResultSetHeader> => {
  const query = 'DELETE FROM user WHERE id = ?';
  const [result] = await db.execute<ResultSetHeader>(query, [id]);
  return result;
};

export default {
  findAll,
  findById,
  findByEmail,
  update,
  deleted,
};
