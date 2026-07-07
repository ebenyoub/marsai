import type { TFunction } from 'i18next';
import { z } from 'zod';
import { aiDeclarationSchema } from './aiDeclaration.schema';
import { collaboratorSchema } from './collaborator.schema';
import { filmSchema } from './filmData.schema';
import { identitySchema } from './identityForm.schema';
import { persistedMediaSchema } from './mediaSchema.schema';

export const finalSubmissionSchema = (t: TFunction) =>
  identitySchema(t)
    .merge(
      filmSchema(t).extend({
        duration: z.string().trim().min(1, t('errors.required')).refine(value => {
          const duration = Number(value);
          return Number.isInteger(duration) && duration >= 1 && duration <= 60;
        }, t('errors.invalid_duration')),
        semanticTags: z.array(z.string().trim().min(1, t('errors.required'))).min(1, t('errors.required')),
      })
    )
    .merge(aiDeclarationSchema(t))
    .merge(persistedMediaSchema(t))
    .extend({
      thumbnail: z.custom<File | null>().nullable(),
      gallery: z.array(z.custom<File>()).max(3, t('errors.max_gallery')),
      collaborators: z.array(collaboratorSchema(t)),
    });
