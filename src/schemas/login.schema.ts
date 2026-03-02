import type { TFunction } from 'i18next';
import { z } from 'zod';

export const loginSchema = (t: TFunction) =>
  z.object({
    email: z.email({
      error: issue => (!issue.input ? t('errors.required') : t('errors.invalid_email')),
    }),
    password: z.string().min(1, t('errors.required')),
  });
