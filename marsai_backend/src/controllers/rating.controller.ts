import { Response } from 'express';
import logger from '../config/logger.js';
import RatingModel from '../models/rating.model.js';
import { AuthenticatedRequest, RatingType, RequestBody, Params, RequestParams } from '../types/type.js';
import { sendError } from '../utils.js';

const createRating = async (req: RequestBody<RatingType>, res: Response) => {
  // Le user_id provient du token vérifié, jamais du body (anti-usurpation)
  const authUserId = (req as AuthenticatedRequest).user?.userId;
  if (!authUserId) {
    return sendError('Utilisateur non identifié', 401);
  }

  // Décision produit (PBI 040) : un vote soumis est définitif.
  const existing = await RatingModel.findByUserAndMovie(authUserId, req.body.movie_id);
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'Vous avez déjà voté pour ce film — le vote est définitif.',
    });
  }

  const results = await RatingModel.createRating({ ...req.body, user_id: authUserId });

  logger.info(`Évaluation enregistrée (user ${req.body.user_id}, movie ${req.body.movie_id}).`);

  return res.status(201).json({
    success: true,
    data: { ...results },
    message: 'Evaluation enregistrée avec succès',
  });
};

const getRatingByMovie = async (req: RequestParams<Params>, res: Response) => {
  const authUserId = (req as AuthenticatedRequest).user?.userId;
  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Utilisateur non identifié' });
  }

  const { id: movieId } = req.params;
  const rating = await RatingModel.findByUserAndMovie(authUserId, Number(movieId));

  return res.status(200).json({
    success: true,
    data: rating,
  });
};

export default {
  createRating,
  getRatingByMovie,
};
