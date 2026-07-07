import { ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { MovieRow, MovieType } from '../types/type.js';
import { insertEntity, updateEntity } from '../utils.js';

const findAll = async (status?: string): Promise<MovieRow[]> => {
  let query = `
    SELECT
      m.*,
      d.firstname AS director_firstname,
      d.lastname AS director_lastname,
      d.country AS countryName
    FROM movie m
    JOIN director d ON m.director_id = d.id
  `;
  
  if (status !== 'all') {
    query += ` WHERE m.status = 'approved'`;
  }

  const [rows] = await db.execute<MovieRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<MovieType | null> => {
  const [rows] = await db.execute<MovieRow[]>('SELECT * FROM movie WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

const columns: (keyof MovieType)[] = [
  'title',
  'title_en',
  'synopsis_fr',
  'synopsis_en',
  'duration',
  'main_language',
  'yt_url',
  'thumbnail',
  'subtitles',
  'stack',
  'methodology',
  'ia_type',
  'status',
  'director_id',
];

const create = async (movie: Partial<MovieType>): Promise<ResultSetHeader> => {
  // La table movie n'a pas de colonne updated_at
  return insertEntity('movie', movie, columns, db, { hasTimestamp: false });
};

const update = async (id: number, data: Partial<MovieType>): Promise<ResultSetHeader> => {
  return updateEntity('movie', id, data, columns, db, { hasTimestamp: false });
};

export default {
  findAll,
  findById,
  create,
  update,
};
