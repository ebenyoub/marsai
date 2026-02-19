import { Request, Response } from 'express';
import UserModel from '../models/user.model.js';
import { Params, UserType } from '../types/type.js';
import bcrypt from 'bcrypt';
import { sendError } from '../utils.js';

const getAllUsers = async (_req: Request, res: Response) => {
  const results = await UserModel.findAll();

  if (results.length === 0) {
    return res.status(200).json({
      success: false,
      data: [],
      message: 'Aucun utilisateur trouvé',
    });
  }

  return res.status(200).json({
    success: true,
    data: results,
  });
};

//--------------------------------------------------------------------------------

const getOneUser = async (req: Request<Params>, res: Response) => {
  const { id } = req.params;
  const results = await UserModel.findOne(id);

  if (!results || results.length === 0) sendError('Cet utilisateur est introuvable.');

  return res.status(200).json({
    success: true,
    data: results,
    message: 'Utilisateur trouvé'
  });
};

//--------------------------------------------------------------------------------

const createUser = async (req: Request<{}, {}, UserType>, res: Response) => {
  const { password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const results = await UserModel.create({ ...userData, password: hashedPassword });

  if (results.affectedRows === 0) sendError('Erreur inscription Utilisateur');

  const userId = results.insertId;

  return res.status(201).json({
    success: true,
    data: { ...results, userId },
    message: 'Utilisateur créer avec succès',
  });
};

//--------------------------------------------------------------------------------

const updateUser = async (req: Request<Params, {}, UserType>, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  if (!id || !user || !user.email) sendError('Veuillez remplir tous les champs');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) sendError('Format d\'email invalide.');

  const results = await UserModel.update(id, user);
  if (results.affectedRows === 0) sendError('Utilisateur introuvable');

  return res.status(200).json({
    success: true,
    data: results,
    message: 'Utilisateur mis à jour avec succès',
  });
};

//--------------------------------------------------------------------------------

const deleteUser = async (req: Request<Params>, res: Response) => {
  const { id } = req.params;
  if (!id) sendError('L\'ID est requis');

  const results = await UserModel.deleted(id);
  if (results.affectedRows === 0) sendError("Utilisateur introuvable.")

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
