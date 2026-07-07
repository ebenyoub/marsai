import type { TFunction } from 'i18next';
import { z } from 'zod';

export const collaboratorSchema = (t: TFunction) =>
  z.object({
    id: z.string().trim().min(1, t('errors.required')),
    firstname: z.string().trim().min(1, t('errors.required')),
    lastname: z.string().trim().min(1, t('errors.required')),
    job: z.string().trim().min(1, t('errors.required')),
    email: z.string().trim().min(1, t('errors.required')).email(t('errors.invalid_email')),
    gender: z.string().optional(),
    movie_id: z.number().optional(),
  });
