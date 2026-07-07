import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.js';
import { AppError } from '../types/type.js';

interface DatabaseError extends AppError {
  code?: string;
  errno?: number;
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  const databaseError = err as DatabaseError;
  let status = err.status || 500;
  let message = err.message || 'Erreur serveur';

  // Handle MySQL Duplicate Entry errors cleanly without exposing raw SQL
  if (databaseError.code === 'ER_DUP_ENTRY' || databaseError.errno === 1062) {
    status = 409;
    const msg = err.message || '';
    if (msg.includes('slug') || msg.toLowerCase().includes('slug')) {
      message = 'Ce slug de festival est déjà utilisé par un autre festival.';
    } else if (msg.includes('name') || msg.toLowerCase().includes('name')) {
      message = 'Ce nom de festival est déjà utilisé.';
    } else {
      message = 'Une entrée en doublon existe déjà.';
    }
  }

  const logMessage = `${status} - ${message} - ${req.originalUrl} - ${req.method}`;

  if (status >= 500) {
    logger.error(logMessage);
  } else {
    logger.warn(logMessage);
  }

  res.status(status).json({
    success: false,
    message,
  });
};
