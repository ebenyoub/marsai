import type { TFunction } from 'i18next';
import { z } from 'zod';

export const mediaSchema = (t: TFunction) =>
  z.object({
    youtubeUrl: z
      .url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
        error: issue => (!issue.input ? t('errors.required') : t('errors.invalid_url')),
      })
      .refine(url => /(youtube\.com|youtu\.be)/.test(url), t('errors.invalid_youtube')),
    hasSubtitles: z.boolean(),
    thumbnail: z.any().refine(file => file !== null && file !== '', t('errors.required')),
    gallery: z.array(z.any()).max(3, t('errors.max_gallery')).optional().default([]),
  });
