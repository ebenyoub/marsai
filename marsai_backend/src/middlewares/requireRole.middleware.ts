import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../types/type.js';
import { sendError } from '../utils.js';

export const requireRole = (roles: UserRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return sendError('Accès refusé, rôle insuffisant', 403);
    }

    next();
  };
};
