import { useTranslation } from 'react-i18next';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/form';
import useForm from '@/hooks/useForm';
import { WizardStepProps } from '@/types/form';
import { mediaSchema } from '@/schemas/mediaSchema.schema';

export default function FormMedia({ onNext, onBack }: WizardStepProps) {
  const { t } = useTranslation();
  const schema = mediaSchema(t);

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      youtubeUrl: '',
      hasSubtitles: false,
      thumbnail: null,
      gallery: [],
    },
    schema
  );

const onSubmit = (formValues: typeof values) => {
    onNext(formValues);
  };

  // Custom handler to extract files from the input event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'thumbnail' | 'gallery') => {
    const files = e.target.files;
    if (!files) return;

    const value = fieldName === 'gallery' ? Array.from(files) : files[0];
    
    // Pass the extracted file(s) to your custom hook
    handleChange({ target: { name: fieldName, value } } as any);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Form noValidate className="m-auto w-full max-w-4xl space-y-8 p-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold text-white">
          <span className="text-primary">{t('submit.step')} 4: </span>
          {t('submit.step4.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step4.description')}</p>
      </div>

      <FormGroup>
        <Label required>{t('submit.step4.youtube.label')}</Label>
        <Input
          type="url"
          name="youtubeUrl"
          value={values.youtubeUrl}
          onChange={handleChange}
          placeholder={t('placeholder.submitform4.youtube')}
        />
        <p className="text-muted-foreground mt-1 text-xs">{t('submit.step4.youtube.hint')}</p>
        {errors.youtubeUrl && <ErrorParagraph>{errors.youtubeUrl}</ErrorParagraph>}
      </FormGroup>

      <FormGroup className="border-border bg-slate-900/50 flex flex-row items-center space-y-0 space-x-3 rounded-xl border p-5 shadow-sm">
        <Input
          type="checkbox"
          name="hasSubtitles"
          id="hasSubtitles"
          checked={values.hasSubtitles}
          onChange={(e) => handleChange({ target: { name: 'hasSubtitles', value: e.target.checked } } as any)}
          className="size-5 accent-primary"
        />
        <Label htmlFor="hasSubtitles" className="m-0 cursor-pointer font-normal text-slate-200">
          {t('submit.step4.subtitles.checkbox')}
        </Label>
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step4.thumbnail.label')}</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/jpeg, image/png, image/gif"
          onChange={(e) => handleFileChange(e, 'thumbnail')}
          className="file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold text-slate-300"
        />
        <p className="text-muted-foreground mt-1 text-xs">{t('submit.step4.thumbnail.hint')}</p>
        {errors.thumbnail && <ErrorParagraph>{errors.thumbnail}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label>{t('submit.step4.gallery.label')}</Label>
        <Input
          type="file"
          name="gallery"
          accept="image/jpeg, image/png, image/gif"
          multiple
          onChange={(e) => handleFileChange(e, 'gallery')}
          className="file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold text-slate-300"
        />
        <div className="mt-1 flex items-center justify-between">
          <p className="text-muted-foreground text-xs">{t('submit.step4.gallery.hint')}</p>
          {Array.isArray(values.gallery) && values.gallery.length > 0 && (
            <p className="text-primary text-xs font-medium">{values.gallery.length} / 3</p>
          )}
        </div>
        {errors.gallery && <ErrorParagraph>{errors.gallery}</ErrorParagraph>}
      </FormGroup>

      <div className="border-border space-y-4 border-t pt-6 mt-8">
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
          <Button variant="purple" type="submit" className="flex items-center gap-2 px-6">
            {t('common.next')}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Form>
  );
}