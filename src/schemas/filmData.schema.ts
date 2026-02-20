import type { TFunction } from 'i18next';
import { z } from 'zod';

export const filmSchema = (t: TFunction) =>
  z.object({
    title: z.string().min(1, t('errors.required')),
    titleEn: z.string().min(1, t('errors.required')),
    duration: z.number().min(1, t('errors.required')),
    language: z.string().min(1, t('errors.required')),
    semanticTags: z.string().min(1, t('errors.required')),
    synopsis: z.string().min(1, t('errors.required')).max(300, t('errors.max_length')),
    synopsisEn: z.string().min(1, t('errors.required')).max(300, t('errors.max_length')),
  });
