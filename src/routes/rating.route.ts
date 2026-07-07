import express from 'express';
import RatingController from '../controllers/rating.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { ratingSchema } from '../validation/rating.schema.js';

const router = express.Router();

router.post('/', verifyToken, validate(ratingSchema), RatingController.createRating);
router.get('/movie/:id', verifyToken, RatingController.getRatingByMovie);

export default router;
