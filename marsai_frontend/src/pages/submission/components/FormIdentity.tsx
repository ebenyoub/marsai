import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import Button from '@/components/ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/form';
import { identitySchema } from '@/schemas/identityForm.schema';
import { FirstStepProps } from '@/types/form';
import type { z } from 'zod';

export default function FormIdentity({ onNext, initialData }: FirstStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = identitySchema(t);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      civility: initialData.civility,
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      birthDate: initialData.birthDate,
      email: initialData.email,
      mobile: initialData.mobile,
      postCode: initialData.postCode,
      address: initialData.address,
      city: initialData.city,
      country: initialData.country,
      job: initialData.job,
      youtube: initialData.youtube,
      instagram: initialData.instagram,
      linkedin: initialData.linkedin,
      facebook: initialData.facebook,
      twitter: initialData.twitter,
      source: initialData.source,
      newsletter: initialData.newsletter,
    },
  });

  const civilityValue = useWatch({ control, name: 'civility' });

  type IdentityValues = z.infer<typeof schema>;

  const onSubmit = (values: IdentityValues) => {
    onNext(values);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Form noValidate={true} className="m-auto w-full max-w-4xl space-y-6 p-4 md:p-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">
          <span className="text-primary">{t('submit.step')} 1: </span>
          {t('submit.step1.title')}
        </h2>
        <p className="text-muted-foreground">{t('submit.step1.description')}</p>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">
          Civilité <span className="text-primary">*</span>
        </Label>
        <RadioGroup
          value={civilityValue}
          onValueChange={value => setValue('civility', value)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M." id="m" />
            <Label htmlFor="m" className="cursor-pointer font-normal">
              M.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Mme" id="mme" />
            <Label htmlFor="mme" className="cursor-pointer font-normal">
              Mme
            </Label>
          </div>
        </RadioGroup>
        {errors.civility && <ErrorParagraph>{errors.civility.message as string}</ErrorParagraph>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input
            placeholder={t('placeholder.submitform1.firstname')}
            {...register('firstName')}
          />
          {errors.firstName && <ErrorParagraph>{errors.firstName.message as string}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input
            placeholder={t('placeholder.submitform1.lastname')}
            {...register('lastName')}
          />
          {errors.lastName && <ErrorParagraph>{errors.lastName.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormGroup>
          <Label required>{t('submit.step1.birthdate')}</Label>
          <Input type="date" {...register('birthDate')} />
          {errors.birthDate && <ErrorParagraph>{errors.birthDate.message as string}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.email')}</Label>
          <Input
            type="email"
            placeholder={t('placeholder.submitform1.email')}
            {...register('email')}
          />
          {errors.email && <ErrorParagraph>{errors.email.message as string}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.mobile')}</Label>
          <Input
            type="tel"
            placeholder={t('placeholder.submitform1.mobile')}
            {...register('mobile')}
          />
          {errors.mobile && <ErrorParagraph>{errors.mobile.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.address')}</Label>
        <Input
          type="text"
          placeholder={t('placeholder.submitform1.address')}
          {...register('address')}
        />
        {errors.address && <ErrorParagraph>{errors.address.message as string}</ErrorParagraph>}
      </FormGroup>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormGroup>
          <Label required>{t('submit.step1.zip')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform1.zip')}
            {...register('postCode')}
          />
          {errors.postCode && <ErrorParagraph>{errors.postCode.message as string}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.city')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform1.city')}
            {...register('city')}
          />
          {errors.city && <ErrorParagraph>{errors.city.message as string}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.country')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform1.country')}
            {...register('country')}
          />
          {errors.country && <ErrorParagraph>{errors.country.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.role')}</Label>
        <Input
          type="text"
          placeholder={t('placeholder.submitform1.job')}
          {...register('job')}
        />
        {errors.job && <ErrorParagraph>{errors.job.message as string}</ErrorParagraph>}
      </FormGroup>

      <div className="border-border mt-4 space-y-4 border-t border-b py-6">
        <Label className="text-lg font-semibold">{t('submit.step1.social')}</Label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormGroup>
            <Label>{t('youtube.name')}</Label>
            <Input
              type="url"
              placeholder={t('placeholder.submitform1.youtubelink')}
              {...register('youtube')}
            />
            {errors.youtube && <ErrorParagraph>{errors.youtube.message as string}</ErrorParagraph>}
          </FormGroup>
          <FormGroup>
            <Label>{t('instagram.name')}</Label>
            <Input
              type="url"
              placeholder={t('placeholder.submitform1.instagramlink')}
              {...register('instagram')}
            />
            {errors.instagram && <ErrorParagraph>{errors.instagram.message as string}</ErrorParagraph>}
          </FormGroup>
          <FormGroup>
            <Label>{t('linkedin.name')}</Label>
            <Input
              type="url"
              placeholder={t('placeholder.submitform1.linkedinlink')}
              {...register('linkedin')}
            />
            {errors.linkedin && <ErrorParagraph>{errors.linkedin.message as string}</ErrorParagraph>}
          </FormGroup>
          <FormGroup>
            <Label>{t('facebook.name')}</Label>
            <Input
              type="url"
              placeholder={t('placeholder.submitform1.facebooklink')}
              {...register('facebook')}
            />
            {errors.facebook && <ErrorParagraph>{errors.facebook.message as string}</ErrorParagraph>}
          </FormGroup>
          <FormGroup className="md:col-span-2">
            <Label>{t('twitter.name')}</Label>
            <Input
              type="url"
              placeholder={t('placeholder.submitform1.twitterlink')}
              {...register('twitter')}
            />
            {errors.twitter && <ErrorParagraph>{errors.twitter.message as string}</ErrorParagraph>}
          </FormGroup>
        </div>
      </div>

      <div className="space-y-6">
        <FormGroup>
          <Label required>{t('submit.step1.question')}</Label>
          <select
            {...register('source')}
            className="border-primary/30 bg-muted focus:ring-primary/40 w-full rounded-md border px-3 py-2 transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50"
          >
            <option value="">{t('placeholder.submitform1.select')}</option>
            <option value="search">{t('submit.step1.source.search')}</option>
            <option value="word_of_mouth">{t('submit.step1.source.word_of_mouth')}</option>
            <option value="press">{t('submit.step1.source.press')}</option>
            <option value="festival">{t('submit.step1.source.festival')}</option>
            <option value="partner">{t('submit.step1.source.partner')}</option>
            <option value="other">{t('submit.step1.source.other')}</option>
          </select>
          {errors.source && <ErrorParagraph>{errors.source.message as string}</ErrorParagraph>}
        </FormGroup>

        <FormGroup className="flex flex-row items-center gap-3 space-y-0 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <input
            type="checkbox"
            id="newsletter"
            {...register('newsletter')}
            className="accent-primary size-5 shrink-0 cursor-pointer"
          />
          <Label htmlFor="newsletter" className="m-0 cursor-pointer font-normal">
            {t('submit.step1.newsletter')}
          </Label>
        </FormGroup>
      </div>

      <div className="border-border pt-4">
        {hasErrors && (
          <div className="bg-destructive/10 border-destructive/20 text-destructive mb-4 flex items-center gap-2 rounded-md border p-3 text-sm">
            <AlertCircle className="size-4" />
            <p>{t('submit.validation.error')}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button variant={'active'} type="button" onClick={() => navigate('/')}>
            {t('common.previous')}
          </Button>
          <Button variant={'purple'} type="submit" className="flex items-center gap-2">
            {t('common.next')}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Form>
  );
}
