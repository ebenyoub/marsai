import type { TFunction } from 'i18next';
import { z } from 'zod';

export const mediaSchema = (t: TFunction) =>
  z.object({
    youtubeUrl: z.string().min(1, t('errors.required')).url(t('errors.invalid_url')),
    thumbnail: z.any().optional(),
    subtitles: z.any().optional(),
    gallery: z.array(z.any()).max(3, t('errors.max_gallery')).optional(),
  });
