import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import Form, { ErrorParagraph, FormGroup, Label, TextArea } from '@/components/ui/form';
import RadioGroup, { RadioGroupItem } from '@/components/ui/RadioGroup';
import Button from '@/components/ui/button';
import { aiDeclarationSchema } from '@/schemas/aiDeclaration.schema';
import { WizardStepProps } from '@/types/form';
import type { z } from 'zod';

export default function FormAi({ onNext, onBack, initialData }: WizardStepProps) {
  const { t } = useTranslation();
  const schema = aiDeclarationSchema(t);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      aiClassification: initialData.aiClassification ?? initialData.deploymentType,
      techStack: initialData.techStack,
      methodology: initialData.methodology,
    },
  });

  const aiClassification = useWatch({ control, name: 'aiClassification' });

  type AiDeclarationValues = z.infer<typeof schema>;

  const onSubmit = (formValues: AiDeclarationValues) => {
    onNext(formValues);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Form noValidate className="m-auto w-full max-w-4xl space-y-8 p-4 md:p-10" onSubmit={handleSubmit(onSubmit)}>
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
          value={aiClassification}
          onValueChange={value => setValue('aiClassification', value)}
          className="grid grid-cols-1 gap-4"
        >
          <div
            className={`flex items-start gap-3 rounded-xl border p-4 transition-all md:p-5 ${aiClassification === '100' ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-900/50'}`}
          >
            <RadioGroupItem value="100" id="type-100" className="mt-1 shrink-0" />
            <Label htmlFor="type-100" className="cursor-pointer font-medium text-slate-200">
              {t('submit.step3.type.100')}
              <span className="mt-1 block text-sm font-normal text-slate-400">{t('submit.step3.type.100.desc')}</span>
            </Label>
          </div>

          <div
            className={`flex items-start gap-3 rounded-xl border p-4 transition-all md:p-5 ${aiClassification === 'hybrid' ? 'border-primary bg-primary/5' : 'border-slate-800 bg-slate-900/50'}`}
          >
            <RadioGroupItem value="hybrid" id="type-hybrid" className="mt-1 shrink-0" />
            <Label htmlFor="type-hybrid" className="cursor-pointer font-medium text-slate-200">
              {t('submit.step3.type.hybrid')}
              <span className="mt-1 block text-sm font-normal text-slate-400">
                {t('submit.step3.type.hybrid.desc')}
              </span>
            </Label>
          </div>
        </RadioGroup>
        {errors.aiClassification && <ErrorParagraph>{errors.aiClassification.message as string}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step3.techstack')}</Label>
        <TextArea
          placeholder={t('submit.step3.techstack.placeholder')}
          className="min-h-30"
          {...register('techStack')}
        />
        {errors.techStack && <ErrorParagraph>{errors.techStack.message as string}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step3.methodology')}</Label>
        <TextArea
          placeholder={t('submit.step3.methodology.placeholder')}
          className="min-h-30"
          {...register('methodology')}
        />
        {errors.methodology && <ErrorParagraph>{errors.methodology.message as string}</ErrorParagraph>}
      </FormGroup>

      <div className="border-border mt-8 space-y-4 border-t pt-6">
        {hasErrors && (
          <div className="bg-destructive/10 border-destructive/20 text-destructive mb-4 flex items-center gap-2 rounded-md border p-3 text-sm">
            <AlertCircle className="size-4" />
            <p>{t('submit.validation.error')}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
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
