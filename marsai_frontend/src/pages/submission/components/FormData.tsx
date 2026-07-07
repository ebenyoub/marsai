import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Form, { ErrorParagraph, FormGroup, Input, Label, TextArea } from '@/components/ui/form';
import Button from '@/components/ui/button';
import { filmSchema } from '@/schemas/filmData.schema';
import { WizardStepProps } from '@/types/form';
import type { z } from 'zod';

export default function FormData({ onNext, onBack }: WizardStepProps) {
  const { t } = useTranslation();
  const schema = filmSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      titleEn: '',
      duration: 60,
      language: '',
      semanticTags: '',
      synopsis: '',
      synopsisEn: '',
    },
  });

  type FilmDataValues = z.infer<typeof schema>;

  const onSubmit = (formValues: FilmDataValues) => {
    onNext({
      ...formValues,
      duration: String(formValues.duration),
      semanticTags: formValues.semanticTags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Form className="m-auto w-full max-w-4xl space-y-6 p-4 md:p-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">
          <span className="text-primary">{t('submit.step')} 2: </span>
          {t('submit.step2.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step2.description')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step2.title.fr')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform2.title.fr')}
            {...register('title')}
          />
          {errors.title && <ErrorParagraph>{errors.title.message as string}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.title.en')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform2.title.en')}
            {...register('titleEn')}
          />
          {errors.titleEn && <ErrorParagraph>{errors.titleEn.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step2.duration')}</Label>
        <Input
          type="number"
          placeholder={t('placeholder.submitform2.duration')}
          {...register('duration', { valueAsNumber: true })}
        />
        {errors.duration && <ErrorParagraph>{errors.duration.message as string}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step2.language')}</Label>
        <Input
          type="text"
          placeholder={t('placeholder.submitform2.language')}
          {...register('language')}
        />
        {errors.language && <ErrorParagraph>{errors.language.message as string}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step2.tags')}</Label>
        <Input
          type="text"
          placeholder={t('placeholder.submitform2.tag')}
          {...register('semanticTags')}
        />
        {errors.semanticTags && <ErrorParagraph>{errors.semanticTags.message as string}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step2.synopsis.label.fr')}</Label>
        <TextArea
          placeholder={t('placeholder.submitform2.synopsis')}
          {...register('synopsis')}
        />
        {errors.synopsis && <ErrorParagraph>{errors.synopsis.message as string}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step2.synopsis.label.en')}</Label>
        <TextArea
          placeholder={t('placeholder.submitform2.synopsis.en')}
          {...register('synopsisEn')}
        />
        {errors.synopsisEn && <ErrorParagraph>{errors.synopsisEn.message as string}</ErrorParagraph>}
      </FormGroup>

      <div className="border-border space-y-4 border-t pt-4">
        {hasErrors && (
          <div className="bg-destructive/10 border-destructive/20 text-destructive mb-4 flex items-center gap-2 rounded-md border p-3 text-sm">
            <AlertCircle className="size-4" />
            <p>{t('submit.validation.error')}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="active" type="button" onClick={onBack} className="flex items-center gap-2">
            <ChevronLeft className="size-4" />
            {t('common.previous')}
          </Button>
          <Button variant="purple" type="submit" className="flex items-center gap-2">
            {t('common.next')}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Form>
  );
}
