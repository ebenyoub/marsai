import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);

export default router;