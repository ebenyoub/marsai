import dotenv from 'dotenv';
import express from 'express';
import userController from '../controllers/user.controller.js';

dotenv.config();
const router = express.Router();
const login = userController;
const register = userController;

router.post('/login', login.connectionUser);
router.post('/register', register.createUser);

export default router;
