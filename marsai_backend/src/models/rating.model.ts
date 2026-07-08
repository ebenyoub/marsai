import { ResultSetHeader } from 'mysql2/promise';
import { RatingType, RatingRow } from '../types/type.js';
import db from '../config/database.js';

const createRating = async (rating: RatingType): Promise<ResultSetHeader> => {
  // Le contrôleur refuse tout revote (vote définitif) ; l'ON DUPLICATE KEY
  // ne subsiste que comme garde-fou contre une course entre deux requêtes.
  const query = `
    INSERT INTO rating (user_id, movie_id, score_creativity, score_technical, score_message, comment, score_total, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      score_creativity = VALUES(score_creativity),
      score_technical = VALUES(score_technical),
      score_message = VALUES(score_message),
      comment = VALUES(comment),
      score_total = VALUES(score_total)
  `;
  const [result] = await db.execute<ResultSetHeader>(query, [
    rating.user_id,
    rating.movie_id,
    rating.score_creativity,
    rating.score_technical,
    rating.score_message,
    rating.comment,
    rating.score_total,
  ]);
  return result;
};

const findMovieIdsByUser = async (userId: number): Promise<number[]> => {
  const [rows] = await db.execute<RatingRow[]>(
    'SELECT movie_id FROM rating WHERE user_id = ?',
    [userId]
  );
  return rows.map((row) => row.movie_id);
};

const findByUserAndMovie = async (userId: number, movieId: number): Promise<RatingType | null> => {
  const [rows] = await db.execute<RatingRow[]>(
    'SELECT * FROM rating WHERE user_id = ? AND movie_id = ?',
    [userId, movieId]
  );
  return rows.length > 0 ? rows[0] : null;
};

export default {
  createRating,
  findByUserAndMovie,
  findMovieIdsByUser,
};
