import type { TFunction } from 'i18next';
import { z } from 'zod';

export const loginSchema = (t: TFunction) =>
  z.object({
    email: z.string().min(1, t('errors.required')).email(t('errors.invalid_email')),
    password: z.string().min(1, t('errors.required')),
  });
