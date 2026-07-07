import type { TFunction } from 'i18next';
import { z } from 'zod';

const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

const isFile = (value: unknown): value is File => typeof File !== 'undefined' && value instanceof File;

const fileSchema = (t: TFunction) =>
  z
    .custom<File>(isFile, { message: t('errors.required') })
    .refine(file => acceptedImageTypes.includes(file.type), t('errors.invalid_file_type'));

const youtubeUrlSchema = (t: TFunction) =>
  z
    .string()
    .trim()
    .min(1, t('errors.required'))
    .url(t('errors.invalid_url'))
    .refine(value => /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(value), t('errors.invalid_youtube'));

export const mediaSchema = (t: TFunction) =>
  z.object({
    youtubeUrl: youtubeUrlSchema(t),
    hasSubtitles: z.boolean(),
    thumbnail: fileSchema(t),
    subtitles: z.any().optional(),
    gallery: z.array(fileSchema(t)).max(3, t('errors.max_gallery')).optional(),
  });

export const persistedMediaSchema = (t: TFunction) =>
  z.object({
    youtubeUrl: youtubeUrlSchema(t),
    hasSubtitles: z.boolean(),
  });
