import { Response } from 'express';
import UserModel from '../models/user.model.js';
import { Params, RequestBody, RequestEmpty, RequestParams, RequestParamsBody, UserType } from '../types/type.js';
import bcrypt from 'bcrypt';
import { sendError } from '../utils.js';
import logger from '../config/logger.js';

const getAllUsers = async (_req: RequestEmpty, res: Response) => {
  const results = await UserModel.findAll();

  if (results.length === 0) {
    logger.warn('Aucun utilisateur présent dans la base de données');
    return res.status(200).json({
      success: false,
      data: [],
      message: 'Aucun utilisateur trouvé',
    });
  }

  logger.info(`${results.length} utilisateurs récupérés avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
  });
};

//--------------------------------------------------------------------------------

const getOneUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findOne(id);

  if (!user) {
    logger.warn(`L'ID ${id} est introuvable.`);
    return sendError('Cet utilisateur est introuvable.');
  }

  logger.info(`Utilisateurs récupéré avec succès`);
  return res.status(200).json({
    success: true,
    data: user,
    message: 'Utilisateur trouvé'
  });
};

//--------------------------------------------------------------------------------

const createUser = async (req: RequestBody<UserType>, res: Response) => {
  const { password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const results = await UserModel.create({ ...userData, password: hashedPassword });

  if (results.affectedRows === 0) {
    logger.warn(`Création d'un utilisateur intérompue.`);
    sendError('Erreur inscription Utilisateur');
  }

  const userId = results.insertId;
   logger.info(`Nouvel utilisateur créé avec l'id ${userId}.`);

  return res.status(201).json({
    success: true,
    data: { ...results, userId },
    message: 'Utilisateur créer avec succès',
  });
};

//--------------------------------------------------------------------------------

const updateUser = async (req: RequestParamsBody<Params, UserType>, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  if (!id || !user || !user.email) {
    logger.error(`Tous les champs sont requis.`);
    sendError('Veuillez remplir tous les champs');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    logger.error(`Le format de l\'email est invalide.`);
    sendError('Format d\'email invalide.');
  }

  const results = await UserModel.update(id, user);
  if (results.affectedRows === 0) {
    logger.warn(`L'utilisateur est introuvable.`);
    sendError('Utilisateur introuvable');
  }

  logger.info(`Utilisateur modifié avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
    message: 'Utilisateur mis à jour avec succès',
  });
};

//--------------------------------------------------------------------------------

const deleteUser = async (req: RequestBody<UserType>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    logger.error(`Id manquant.`);
    sendError('L\'ID est requis');
  }

  const results = await UserModel.deleted(id);
  if (results.affectedRows === 0) {
    logger.warn(`Utilisateur introuvable`);
    sendError("Utilisateur introuvable.");
  }

  logger.info(`Utilisateurs supprimé avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
    message: 'User supprimé avec succès',
  });
};

//--------------------------------------------------------------------------------

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
