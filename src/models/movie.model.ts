import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import db from '../config/database.js';
import { MovieType } from '../types/type.js';

const findAll = async () => {
  const [result] = await db.execute('SELECT * FROM movie');
  return result as MovieType[];
};

//--------------------------------------------------------------------------------

const findById = async (id: number) => {
  const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM movie WHERE id = ?', [id]);
  return rows[0] as MovieType;
};

//--------------------------------------------------------------------------------

const create = async (movie: MovieType): Promise<ResultSetHeader> => {
  const query = `
    INSERT INTO movie (
      title, 
      title_en, 
      synopsis_fr, 
      synopsis_en, 
      duration, 
      main_language, 
      yt_url, 
      thumbnail, 
      subtitles, 
      stack, 
      methodology, 
      ia_type, 
      status, 
      created_at, 
      director_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute<ResultSetHeader>(query, [
    movie.title,
    movie.title_en,
    movie.synopsis_fr,
    movie.synopsis_en,
    movie.duration,
    movie.main_language,
    movie.yt_url,
    movie.thumbnail,
    movie.subtitles,
    movie.stack,
    movie.methodology,
    movie.ia_type,
    movie.status || 'pending',
    movie.created_at,
    movie.director_id
  ]);

  return result;
};

export default {
  findAll,
  findById,
  create,
};
