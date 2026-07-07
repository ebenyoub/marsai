import db from '../config/database.js';
import { ResultSetHeader } from 'mysql2';
import { FestivalRow, FestivalType } from '../types/type.js';

const findAll = async (): Promise<FestivalRow[]> => {
  const [result] = await db.execute<FestivalRow[]>('SELECT * FROM festival');
  return result;
};

//--------------------------------------------------------------------------------

const findById = async (id: number): Promise<FestivalRow | null> => {
  const [result] = await db.execute<FestivalRow[]>('SELECT * FROM festival WHERE id = ?', [id]);
  return result.length > 0 ? result[0] : null;
};

//--------------------------------------------------------------------------------

const create = async (festival: FestivalType): Promise<ResultSetHeader> => {
  const query =
    'INSERT INTO festival (name, description, created_at, start_at, end_at, status, booking_total, slug, city, logo_url, primary_color, youtube_api_key) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.execute<ResultSetHeader>(query, [
    festival.name,
    festival.description,
    festival.start_at,
    festival.end_at,
    festival.status,
    festival.booking_total,
    festival.slug,
    festival.city,
    festival.logo_url ?? null,
    festival.primary_color ?? null,
    festival.youtube_api_key ?? null,
  ]);
  return result;
};

//--------------------------------------------------------------------------------

import { updateEntity } from '../utils.js';

const update = async (id: number, data: Partial<FestivalType>): Promise<ResultSetHeader> => {
  const columns: (keyof FestivalType)[] = ['name', 'description', 'start_at', 'end_at', 'status', 'booking_total', 'slug', 'city', 'logo_url', 'primary_color', 'youtube_api_key'];
  return updateEntity('festival', id, data, columns, db, { hasTimestamp: false });
};

//--------------------------------------------------------------------------------

const deleted = async (id: number): Promise<ResultSetHeader> => {
  const [result] = await db.execute<ResultSetHeader>(`DELETE FROM festival WHERE id = ?`, [id]);
  return result;
};

//--------------------------------------------------------------------------------

export default {
  findAll,
  findById,
  create,
  update,
  deleted,
};
