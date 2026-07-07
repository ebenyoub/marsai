import type { TFunction } from 'i18next';
import { z } from 'zod';

export const aiDeclarationSchema = (t: TFunction) =>
  z.object({
    aiClassification: z
      .string()
      .trim()
      .min(1, t('errors.select_option'))
      .refine(val => val === '100' || val === 'hybrid', { message: t('errors.select_option') }),

    techStack: z.string().trim().min(1, t('errors.required')).max(500, t('errors.max_length_500')),

    methodology: z.string().trim().min(1, t('errors.required')).max(500, t('errors.max_length_500')),
  });
