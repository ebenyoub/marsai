import { useTranslation } from 'react-i18next';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Form, { ErrorParagraph, FormGroup, Input, Label, TextArea } from '@/components/ui/Form';
import Button from '@/components/ui/button';
import useForm from '@/hooks/useForm';
import { filmSchema } from '@/schemas/filmData.schema';
import { WizardStepProps } from '@/types/form';

export default function FormData({ onNext, onBack }: WizardStepProps) {
  const { t } = useTranslation();
  const schema = filmSchema(t);

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      title: '',
      titleEn: '',
      duration: 0,
      language: '',
      semanticTags: '',
      synopsis: '',
      synopsisEn: '',
    },
    schema
  );

  const onSubmit = (formValues: typeof values) => {
    onNext(formValues);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
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
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder={t('placeholder.submitform2.title.fr')}
            />
            {errors.title && <ErrorParagraph>{errors.title}</ErrorParagraph>}
          </FormGroup>

          <FormGroup>
            <Label required>{t('submit.step2.title.en')}</Label>
            <Input
              type="text"
              name="titleEn"
              value={values.titleEn}
              onChange={handleChange}
              placeholder={t('placeholder.submitform2.title.en')}
            />
            {errors.titleEn && <ErrorParagraph>{errors.titleEn}</ErrorParagraph>}
          </FormGroup>
        </div>

        <FormGroup>
          <Label required>{t('submit.step2.duration')}</Label>
          <Input
            type="number"
            name="duration"
            value={values.duration === 0 ? '' : values.duration}
            onChange={handleChange}
            placeholder={t('placeholder.submitform2.duration')}
          />
          {errors.duration && <ErrorParagraph>{errors.duration}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.language')}</Label>
          <Input
            type="text"
            name="language"
            value={values.language}
            onChange={handleChange}
            placeholder={t('placeholder.submitform2.language')}
          />
          {errors.language && <ErrorParagraph>{errors.language}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.tags')}</Label>
          <Input
            type="text"
            name="semanticTags"
            value={values.semanticTags}
            onChange={handleChange}
            placeholder={t('placeholder.submitform2.tag')}
          />
          {errors.semanticTags && <ErrorParagraph>{errors.semanticTags}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.synopsis.label.fr')}</Label>
          <TextArea
            name="synopsis"
            value={values.synopsis}
            onChange={handleChange}
            placeholder={t('placeholder.submitform2.synopsis')}
          />
          {errors.synopsis && <ErrorParagraph>{errors.synopsis}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step2.synopsis.label.en')}</Label>
          <TextArea
            name="synopsisEn"
            value={values.synopsisEn}
            onChange={handleChange}
            placeholder={t('placeholder.submitform2.synopsis.en')}
          />
          {errors.synopsisEn && <ErrorParagraph>{errors.synopsisEn}</ErrorParagraph>}
        </FormGroup>

        <div className="border-border space-y-4 border-t pt-4 pb-4">
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
    </>
  );
}
