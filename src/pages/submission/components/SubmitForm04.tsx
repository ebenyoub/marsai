import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/form';
import useForm from '@/hooks/useForm';
import { mediaSchema } from '@/schemas/mediaSchema.schema';

function SubmitForm04() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const onSubmit = (formValue: typeof values) => {
    console.log('Step 4 success:', formValue);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <Form noValidate={true} className="m-auto w-4xl space-y-6 p-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="pb-3 text-2xl font-semibold">
            <span className="text-primary">{t('submit.step')} 4: </span>
            {t('submit.step4.title')}
          </h2>
          <p className="text-muted-foreground">{t('submit.step4.description')}</p>
        </div>

        <FormGroup>
          <Label required>{t('submit.step4.youtube.label')}</Label>
          <Input
            type="text"
            name="youtubeUrl"
            value={values.youtubeUrl}
            onChange={handleChange}
            placeholder={t('placeholder.submitform4.youtube')}
          />
          <p className="text-muted-foreground mt-1 text-xs">{t('submit.step4.youtube.hint')}</p>
          {errors.youtubeUrl && <ErrorParagraph>{errors.youtubeUrl}</ErrorParagraph>}
        </FormGroup>

        <FormGroup className="border-border bg-background/50 flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4 shadow-sm">
          <Input
            type="checkbox"
            name="hasSubtitles"
            id="hasSubtitles"
            checked={values.hasSubtitles}
            onChange={handleChange}
          />
          <Label htmlFor="hasSubtitles" className="m-0 cursor-pointer font-normal">
            {t('submit.step4.subtitles.checkbox')}
          </Label>
        </FormGroup>

        <FormGroup>
          <Label required>{t('submit.step4.thumbnail.label')}</Label>
          <Input
            type="file"
            name="thumbnail"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleChange}
            className="file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
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
            onChange={handleChange}
            className="file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-muted-foreground text-xs">{t('submit.step4.gallery.hint')}</p>
            {Array.isArray(values.gallery) && values.gallery.length > 0 && (
              <p className="text-primary text-xs font-medium">{values.gallery.length} / 3</p>
            )}
          </div>
          {errors.gallery && <ErrorParagraph>{errors.gallery}</ErrorParagraph>}
        </FormGroup>

        <div className="border-border space-y-4 border-t pt-4 pb-4">
          {hasErrors && (
            <div className="bg-destructive/10 border-destructive/20 text-destructive mb-4 flex items-center gap-2 rounded-md border p-3 text-sm">
              <AlertCircle className="size-4" />
              <p>{t('submit.validation.error')}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="active" type="button" onClick={() => navigate(-1)} className="flex items-center gap-2">
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

export default SubmitForm04;
