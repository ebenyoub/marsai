import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';
import { idParamSchema } from '../validation/idParams.schema.js';
import { userSchema } from '../validation/user.schema.js';

const router = express.Router();

const adminRoles = ['admin', 'super-admin'] as const;

router.get('/', verifyToken, requireRole([...adminRoles]), UserController.getAllUsers);
router.post('/jury', verifyToken, requireRole([...adminRoles]), UserController.addJuryMember);
router.get(
  '/:id',
  verifyToken,
  requireRole([...adminRoles]),
  validate(idParamSchema, 'params'),
  UserController.getOneUser,
);
router.put(
  '/:id',
  verifyToken,
  requireRole([...adminRoles]),
  validate(idParamSchema, 'params'),
  validate(userSchema.partial()),
  UserController.updateUser,
);
router.delete(
  '/:id',
  verifyToken,
  requireRole([...adminRoles]),
  validate(idParamSchema, 'params'),
  UserController.deleteUser,
);

export default router;
