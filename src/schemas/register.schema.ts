import type { TFunction } from 'i18next';
import { z } from 'zod';

export const registerSchema = (t: TFunction) =>
  z
    .object({
      firstName: z.string().min(1, t('errors.required')),
      lastName: z.string().min(1, t('errors.required')),
      email: z.string().min(1, t('errors.required')).email(t('errors.invalid_email')),
      password: z.string().min(8, t('errors.pass_min_8')),
      confirmPassword: z.string().min(1, t('errors.required')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('errors.passwords_dont_match'),
      path: ['confirmPassword'],
    });
