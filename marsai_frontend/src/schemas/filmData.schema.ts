import type { TFunction } from 'i18next';
import { z } from 'zod';

export const filmSchema = (t: TFunction) =>
  z.object({
    title: z.string().trim().min(1, t('errors.required')),
    titleEn: z.string().trim().min(1, t('errors.required')),
    duration: z
      .number({ invalid_type_error: t('errors.required') })
      .int(t('errors.invalid_duration'))
      .min(1, t('errors.invalid_duration'))
      .max(60, t('errors.invalid_duration')),
    language: z.string().trim().min(1, t('errors.required')),
    semanticTags: z.string().trim().min(1, t('errors.required')),
    synopsis: z.string().trim().min(1, t('errors.required')).max(300, t('errors.max_length')),
    synopsisEn: z.string().trim().min(1, t('errors.required')).max(300, t('errors.max_length')),
  });
