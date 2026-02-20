import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/type.js';
import logger from '../config/logger.js';

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || err.statusCode || 500;
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method}`);

  res.status(status).json({
    success: false,
    message: err.message || 'Erreur serveur',
  });
};
