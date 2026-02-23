import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup';
import Form, { FormGroup, Label, TextArea, ErrorParagraph } from '@/components/ui/form';
import Button from '@/components/ui/button';
import useForm from '@/hooks/useForm';
import { aiDeclarationSchema } from '@/schemas/aiDeclaration.schema';
import { WizardStepProps } from '@/types/form';

export default function FormAi({ onNext, onBack }: WizardStepProps) {
  const { t } = useTranslation();
  const schema = aiDeclarationSchema(t);

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      aiClassification: '100',
      techStack: '',
      methodology: '',
    },
    schema
  );

  const onSubmit = (formValues: typeof values) => {
    onNext(formValues);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Form noValidate className="m-auto w-full max-w-4xl space-y-8 p-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold text-white">
          <span className="text-primary">{t('submit.step')} 3: </span>
          {t('submit.step3.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step3.description')}</p>
      </div>

      <FormGroup className="space-y-4">
        <Label required className="text-base text-slate-200">
          {t('submit.step3.type')}
        </Label>
        <RadioGroup
          value={values.aiClassification}
          onValueChange={(value) =>
            handleChange({ target: { name: 'aiClassification', value } } as any)
          }
          className="grid grid-cols-1 gap-4"
        >
          <div className={`flex items-start gap-3 rounded-xl border p-5 transition-all ${values.aiClassification === '100' ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-900/50'}`}>
            <RadioGroupItem value="100" id="type-100" className="mt-1" />
            <Label htmlFor="type-100" className="cursor-pointer font-medium text-slate-200">
              {t('submit.step3.type.100')}
              <span className="mt-1 block text-sm font-normal text-slate-400">
                {t('submit.step3.type.100.desc')}
              </span>
            </Label>
          </div>

          <div className={`flex items-start gap-3 rounded-xl border p-5 transition-all ${values.aiClassification === 'hybrid' ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-900/50'}`}>
            <RadioGroupItem value="hybrid" id="type-hybrid" className="mt-1" />
            <Label htmlFor="type-hybrid" className="cursor-pointer font-medium text-slate-200">
              {t('submit.step3.type.hybrid')}
              <span className="mt-1 block text-sm font-normal text-slate-400">
                {t('submit.step3.type.hybrid.desc')}
              </span>
            </Label>
          </div>
        </RadioGroup>
        {errors.aiClassification && <ErrorParagraph>{errors.aiClassification}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step3.techstack')}</Label>
        <TextArea
          name="techStack"
          value={values.techStack}
          onChange={handleChange}
          placeholder={t('submit.step3.techstack.placeholder')}
          className="min-h-30"
        />
        {errors.techStack && <ErrorParagraph>{errors.techStack}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step3.methodology')}</Label>
        <TextArea
          name="methodology"
          value={values.methodology}
          onChange={handleChange}
          placeholder={t('submit.step3.methodology.placeholder')}
          className="min-h-30"
        />
        {errors.methodology && <ErrorParagraph>{errors.methodology}</ErrorParagraph>}
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