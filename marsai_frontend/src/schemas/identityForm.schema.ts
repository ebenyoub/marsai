import type { TFunction } from 'i18next';
import { z } from 'zod';

const optionalSocialUrl = (t: TFunction) =>
  z
    .string()
    .trim()
    .url(t('errors.invalid_url'))
    .refine(value => value.startsWith('https://'), t('errors.invalid_url'))
    .optional()
    .or(z.literal(''));

export const identitySchema = (t: TFunction) =>
  z.object({
    civility: z.string().trim().min(1, t('errors.required')),
    firstName: z.string().trim().min(1, t('errors.required')),
    lastName: z.string().trim().min(1, t('errors.required')),
    birthDate: z.string().trim().min(1, t('errors.required')),
    email: z.string().trim().min(1, t('errors.required')).email(t('errors.invalid_email')),
    mobile: z.string().trim().min(1, t('errors.required')),
    postCode: z.string().trim().min(1, t('errors.required')),
    address: z.string().trim().min(1, t('errors.required')),
    city: z.string().trim().min(1, t('errors.required')),
    country: z.string().trim().min(1, t('errors.required')),
    job: z.string().trim().min(1, t('errors.required')),
    youtube: optionalSocialUrl(t),
    instagram: optionalSocialUrl(t),
    linkedin: optionalSocialUrl(t),
    facebook: optionalSocialUrl(t),
    twitter: optionalSocialUrl(t),
    source: z.string().trim().min(1, t('errors.select_option')),
    newsletter: z.boolean(),
  });
