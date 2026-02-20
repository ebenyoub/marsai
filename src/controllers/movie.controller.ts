import { Response } from 'express';
import movieModel from '../models/movie.model.js';
import { RequestEmpty } from '../types/type.js';
import logger from '../config/logger.js';

const getAllMovies = async (_req: RequestEmpty, res: Response) => {
  const results = await movieModel.findAll();

  if (results.length === 0) {
    logger.warn(`Aucune vidéo n'a été trouvé.`);
    return res.status(200).json({
    success: true,
    data: [],
    message: 'Aucune vidéo n\'a été trouvé',
  });
  }

  logger.info(`${results.length} vidéos ont été trouvées`);
  res.status(200).json({
    success: true,
    data: results,
    message: 'Liste des films trouvé',
  });
};

//--------------------------------------------------------------------------------

export default {
  getAllMovies,
};
