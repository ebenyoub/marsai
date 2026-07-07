import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { idParamSchema } from '../validation/idParams.schema.js';
import { userSchema } from '../validation/user.schema.js';

const router = express.Router();

router.get('/', verifyToken, UserController.getAllUsers);
router.post('/jury', verifyToken, UserController.addJuryMember);
router.get('/:id', verifyToken, validate(idParamSchema, 'params'), UserController.getOneUser);
router.put(
  '/:id',
  verifyToken,
  validate(idParamSchema, 'params'),
  validate(userSchema.partial()),
  UserController.updateUser,
);
router.delete('/:id', verifyToken, validate(idParamSchema, 'params'), UserController.deleteUser);

export default router;
