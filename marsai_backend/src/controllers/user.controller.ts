import { Response } from 'express';
import UserModel from '../models/user.model.js';
import { Params, RequestEmpty, RequestParams, RequestParamsBody, UserType } from '../types/type.js';
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

const getOneUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);
  const user = await UserModel.findById(numericId);

  if (!user) {
    return sendError('Cet utilisateur est introuvable.', 404);
  }

  logger.info(`L'utilisateur ${user.firstname} ${user.lastname} récupéré avec succès`);
  return res.status(200).json({
    success: true,
    data: user,
  });
};

const updateUser = async (req: RequestParamsBody<Params, Partial<UserType>>, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  const numericId = Number(id);

  const results = await UserModel.update(numericId, user);

  if (results.affectedRows === 0) {
    return sendError(`L'utilisateur ${id} néxiste pas.`);
  }

  logger.info(`Utilisateur modifié avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
    message: 'Utilisateur mis à jour avec succès',
  });
};

const deleteUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;

  const numericId = Number(id);

  const results = await UserModel.deleted(numericId);

  if (results.affectedRows === 0) {
    return sendError('Utilisateur introuvable.');
  }

  logger.info(`Utilisateurs supprimé avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
    message: 'User supprimé avec succès',
  });
};

import AuthModel from '../models/auth.model.js';
import bcrypt from 'bcrypt';
import { RequestBody } from '../types/type.js';

const addJuryMember = async (req: RequestBody<{ email: string }>, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return sendError('Email requis', 400);
  }

  const existingUser = await UserModel.findByEmail(email);

  if (existingUser) {
    if (existingUser.role === 'jury' || existingUser.role === 'admin' || existingUser.role === 'super-admin') {
      return res.status(200).json({
        success: true,
        message: `L'utilisateur avec cet email a déjà le rôle '${existingUser.role}'.`,
        user: existingUser,
      });
    }

    // Promouvoir l'utilisateur existant
    await UserModel.update(existingUser.id!, { role: 'jury' });
    logger.info(`Utilisateur ${email} promu au rôle de juré.`);
    return res.status(200).json({
      success: true,
      message: "L'utilisateur existant a été promu au rôle de juré.",
      user: { ...existingUser, role: 'jury' },
    });
  }

  // Créer un nouveau compte juré avec mot de passe temporaire
  const tempPassword = 'password123';
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const results = await AuthModel.create({
    firstname: 'Membre',
    lastname: 'Jury',
    email,
    password: hashedPassword,
    role: 'jury',
    festival_id: 1,
  } as UserType);

  if (results.affectedRows === 0) {
    return sendError('Erreur lors de la création du compte juré.', 500);
  }

  logger.info(`Nouveau compte juré créé pour ${email}.`);
  return res.status(201).json({
    success: true,
    message: 'Nouveau compte juré créé avec succès',
    isNewAccount: true,
    user: {
      id: results.insertId,
      email,
      firstname: 'Membre',
      lastname: 'Jury',
      role: 'jury',
    },
  });
};

export default {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  addJuryMember,
};
