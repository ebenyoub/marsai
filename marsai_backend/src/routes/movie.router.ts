import express from 'express';
import MovieController from '../controllers/movie.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { movieSchema } from '../validation/movie.schema.js';
import { idParamSchema } from '../validation/idParams.schema.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';

const router = express.Router();

router.get('/', MovieController.getAllMovies);
router.get('/stats', verifyToken, requireRole(['admin', 'super-admin']), MovieController.getStats);
router.get('/:id', validate(idParamSchema, 'params'), MovieController.getMovieById);
router.post('/', verifyToken, validate(movieSchema), MovieController.create);
router.put(
  '/:id',
  verifyToken,
  requireRole(['admin', 'super-admin']),
  validate(idParamSchema, 'params'),
  validate(movieSchema.partial()),
  MovieController.update,
);
// router.delete('/:id', validate(idParamSchema, 'params'), MovieController.deleteUser);

export default router;
