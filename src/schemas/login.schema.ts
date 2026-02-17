import type { TFunction } from 'i18next';
import { z } from 'zod';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = (t: TFunction) =>
  z.object({
    email: z.string().trim().min(1, t('errors.required')).regex(emailPattern, t('errors.invalid_email')),

    password: z
      .string()
      .min(1, t('errors.required'))
      .min(6, t('errors.password_too_short'))
      .regex(/^(?=.*[A-Z])(?=.*\d).+$/, t('errors.password_complexity')),
  });
