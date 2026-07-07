import express from 'express';
import FestivalController from '../controllers/festival.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';
import { festivalSchema } from '../validation/festival.schema.js';
import { idParamSchema } from '../validation/idParams.schema.js';

const router = express.Router();

router.get('/', FestivalController.getAllFestivals);
router.get('/:id', validate(idParamSchema, 'params'), FestivalController.getFestivalById);
router.post(
  '/',
  verifyToken,
  requireRole(['super-admin']),
  validate(festivalSchema),
  FestivalController.createFestival,
);
router.put(
  '/:id',
  verifyToken,
  requireRole(['super-admin']),
  validate(idParamSchema, 'params'),
  validate(festivalSchema.partial()),
  FestivalController.updateFestival,
);
router.delete(
  '/:id',
  verifyToken,
  requireRole(['super-admin']),
  validate(idParamSchema, 'params'),
  FestivalController.deleteFestival,
);

export default router;
