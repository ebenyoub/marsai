// src/schemas/register.schema.ts
import type { TFunction } from 'i18next';
import { z } from 'zod';

export const registerSchema = (t: TFunction) =>
  z.object({
    firstname: z.string().trim().min(2, t('errors.min_2_chars')),
    lastname: z.string().trim().min(2, t('errors.min_2_chars')),
    email: z.email({
      error: issue => (!issue.input ? t('errors.required') : t('errors.invalid_email')),
    }),
    password: z
      .string()
      .min(8, t('errors.pass_min_8'))
      .regex(/[A-Z]/, t('errors.pass_uppercase'))
      .regex(/[0-9]/, t('errors.pass_number')),
    festival_id: z.number(t('errors.required')).int().positive(),
  });
