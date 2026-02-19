import { Request, Response } from 'express';
import movieModel from '../models/movie.model.js';
import { sendError } from '../utils.js';

const getAllMovies = async (_req: Request, res: Response) => {
  const results = await movieModel.findAll();

  if (results.length === 0) sendError("Aucune vidéo n'a été trouvée.");

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
