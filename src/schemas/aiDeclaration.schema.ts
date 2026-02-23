import { z } from 'zod';
import type { TFunction } from 'i18next';

export const aiDeclarationSchema = (t: TFunction) =>
  z.object({
    aiClassification: z
      .string()
      .trim()
      .min(1, t('errors.select_option'))
      .refine(
        (val) => val === '100' || val === 'hybrid',
        { message: t('errors.select_option') }
      ),

    techStack: z
      .string()
      .min(1, t('errors.required'))
      .max(500, t('errors.max_length')),

    methodology: z
      .string()
      .min(1, t('errors.required'))
      .max(500, t('errors.max_length')),
  });