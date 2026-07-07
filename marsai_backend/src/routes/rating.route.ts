import express from 'express';
import RatingController from '../controllers/rating.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';
import { ratingSchema } from '../validation/rating.schema.js';

const router = express.Router();

const juryRoles = ['jury', 'admin', 'super-admin'] as const;

router.post('/', verifyToken, requireRole([...juryRoles]), validate(ratingSchema), RatingController.createRating);
router.get('/movie/:id', verifyToken, requireRole([...juryRoles]), RatingController.getRatingByMovie);

export default router;
