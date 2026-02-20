import { Request, Response } from 'express';
import festivalModel from '../models/festival.model.js';
import { FestivalType, Params, RequestEmpty, RequestParams } from '../types/type.js';
import { sendError } from '../utils.js';
import logger from '../config/logger.js';

const getAllFestivals = async (_req: RequestEmpty, res: Response) => {
  const results = await festivalModel.findAll();
  if (results.length === 0) {
    logger.error('Aucun festival dans la base de donné');
    sendError("Aucun festival dans la base de donné");
  }

  logger.info(`${results.length} festiva${results.length ? 'l' : 'ux'} récupéré.`);
  return res.status(200).json({
    success: true,
    data: results
  });
};
//--------------------------------------------------------------------------------

const getFestivalById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;

  const festival = await festivalModel.findById(id);

  if (!festival) {
    logger.error("Aucun festival trouvé");
    return sendError("Aucun festinal trouvé.")
  }

  logger.info(`Festival "${festival.name}" récupéré avec succès.`);
  res.status(200).json(festival);
};

//--------------------------------------------------------------------------------

const createFestival = async (req: Request, res: Response) => {
  try {
    const festival: FestivalType = req.body;
    const results = await festivalModel.create(festival);
    if (!results) {
      return res.status(400).json({
        success: false,
        message: 'Erreur lors de la création du Festival',
      });
    }
    return res.status(201).json({
      success: true,
      data: results,
      message: 'Festival créé avec succès',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du réalisateur',
    });
  }
};
//--------------------------------------------------------------------------------

const updateFestival = async (req: Request<Params>, res: Response) => {
  try {
    const id = req.params.id;
    const festival: FestivalType = req.body;
    const results = await festivalModel.update(id, festival);
    if (!results) {
      return res.status(404).json({ message: 'Festival non trouvé' });
    }
    res.status(201).json({ message: 'Festival mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du festival', error });
  }
};
//--------------------------------------------------------------------------------

const deleteFestival = async (req: Request<Params>, res: Response) => {
  try {
    const id = req.params.id;
    const deletedFestival = await festivalModel.deleted(id);
    if (!deletedFestival) {
      return res.status(404).json({ message: 'Festival non trouvé' });
    }
    res.status(200).json({ message: 'Festival supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du festival', error });
  }
};
//--------------------------------------------------------------------------------
export default {
  getAllFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival,
};
