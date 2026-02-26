import type { TFunction } from 'i18next';
import { z } from 'zod';

const optionalSocialUrl = (t: TFunction) =>
  z
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      error: t('errors.invalid_url'),
    })
    .optional()
    .or(z.literal(''));

export const identitySchema = (t: TFunction) =>
  z.object({
    civility: z.string().min(1, t('errors.required')),
    firstName: z.string().min(1, t('errors.required')),
    lastName: z.string().min(1, t('errors.required')),
    birthDate: z.string().min(1, t('errors.required')),
    email: z.email({
      error: issue => (!issue.input ? t('errors.required') : t('errors.invalid_email')),
    }),
    mobile: z.string().min(1, t('errors.required')),
    postCode: z.string().min(1, t('errors.required')),
    address: z.string().min(1, t('errors.required')),
    city: z.string().min(1, t('errors.required')),
    country: z.string().min(1, t('errors.required')),
    job: z.string().min(1, t('errors.required')),
    youtube: optionalSocialUrl(t),
    instagram: optionalSocialUrl(t),
    linkedin: optionalSocialUrl(t),
    facebook: optionalSocialUrl(t),
    twitter: optionalSocialUrl(t),
    source: z.string().min(1, t('errors.select_option')),
    newsletter: z.boolean(),
  });
