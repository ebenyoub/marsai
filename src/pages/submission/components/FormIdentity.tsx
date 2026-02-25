import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import Button from '@/components/ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/form';
import useForm from '@/hooks/useForm';
import { identitySchema } from '@/schemas/identityForm.schema';
import { FirstStepProps } from '@/types/form';

export default function FormIdentity({ onNext }: FirstStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = identitySchema(t);

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      civility: 'M.',
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      mobile: '',
      postCode: '',
      address: '',
      city: '',
      country: '',
      job: '',
      youtube: '',
      instagram: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      source: '',
      newsletter: false,
    },
    schema
  );

  const onSubmit = async (formValues: typeof values) => {
    onNext(formValues);
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
          value={values.civility}
          onValueChange={value =>
            handleChange({ target: { name: 'civility', value } } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
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
        {errors.civility && <ErrorParagraph>{errors.civility}</ErrorParagraph>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.firstname')}
          />
          {errors.firstName && <ErrorParagraph>{errors.firstName}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.lastname')}
          />
          {errors.lastName && <ErrorParagraph>{errors.lastName}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormGroup>
          <Label required>{t('submit.step1.birthdate')}</Label>
          <Input type="date" name="birthDate" value={values.birthDate} onChange={handleChange} />
          {errors.birthDate && <ErrorParagraph>{errors.birthDate}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.email')}</Label>
          <Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.email')}
          />
          {errors.email && <ErrorParagraph>{errors.email}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.mobile')}</Label>
          <Input
            type="tel"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.mobile')}
          />
          {errors.mobile && <ErrorParagraph>{errors.mobile}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.address')}</Label>
        <Input
          type="text"
          name="address"
          value={values.address}
          onChange={handleChange}
          placeholder={t('placeholder.submitform1.address')}
        />
        {errors.address && <ErrorParagraph>{errors.address}</ErrorParagraph>}
      </FormGroup>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormGroup>
          <Label required>{t('submit.step1.zip')}</Label>
          <Input
            type="text"
            name="postCode"
            value={values.postCode}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.zip')}
          />
          {errors.postCode && <ErrorParagraph>{errors.postCode}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.city')}</Label>
          <Input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.city')}
          />
          {errors.city && <ErrorParagraph>{errors.city}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.country')}</Label>
          <Input
            type="text"
            name="country"
            value={values.country}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.country')}
          />
          {errors.country && <ErrorParagraph>{errors.country}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step1.role')}</Label>
        <Input
          type="text"
          name="job"
          value={values.job}
          onChange={handleChange}
          placeholder={t('placeholder.submitform1.job')}
        />
        {errors.job && <ErrorParagraph>{errors.job}</ErrorParagraph>}
      </FormGroup>

      <div className="border-border mt-4 space-y-4 border-t border-b py-6">
        <Label className="text-lg font-semibold">{t('submit.step1.social')}</Label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormGroup>
            <Label>{t('youtube.name')}</Label>
            <Input
              type="url"
              name="youtube"
              value={values.youtube}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.youtubelink')}
            />
            {errors.youtube && <ErrorParagraph>{errors.youtube}</ErrorParagraph>}
          </FormGroup>
          <FormGroup>
            <Label>{t('instagram.name')}</Label>
            <Input
              type="url"
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.instagramlink')}
            />
            {errors.instagram && <ErrorParagraph>{errors.instagram}</ErrorParagraph>}
          </FormGroup>
          <FormGroup>
            <Label>{t('linkedin.name')}</Label>
            <Input
              type="url"
              name="linkedin"
              value={values.linkedin}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.linkedinlink')}
            />
            {errors.linkedin && <ErrorParagraph>{errors.linkedin}</ErrorParagraph>}
          </FormGroup>
          <FormGroup>
            <Label>{t('facebook.name')}</Label>
            <Input
              type="url"
              name="facebook"
              value={values.facebook}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.facebooklink')}
            />
            {errors.facebook && <ErrorParagraph>{errors.facebook}</ErrorParagraph>}
          </FormGroup>
          <FormGroup className="md:col-span-2">
            <Label>{t('twitter.name')}</Label>
            <Input
              type="url"
              name="twitter"
              value={values.twitter}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.twitterlink')}
            />
            {errors.twitter && <ErrorParagraph>{errors.twitter}</ErrorParagraph>}
          </FormGroup>
        </div>
      </div>

      <div className="space-y-6">
        <FormGroup>
          <Label required>{t('submit.step1.question')}</Label>
          <select
            name="source"
            value={values.source}
            onChange={handleChange}
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
          {errors.source && <ErrorParagraph>{errors.source}</ErrorParagraph>}
        </FormGroup>

        <FormGroup className="flex flex-row items-center gap-3 space-y-0 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={values.newsletter}
            onChange={handleChange}
            className="accent-primary size-5 shrink-0 cursor-pointer"
          />
          <Label htmlFor="newsletter" className="m-0 cursor-pointer font-normal">
            {t('submit.step1.newsletter')}
          </Label>
        </FormGroup>
        {errors.newsletter && <ErrorParagraph>{errors.newsletter}</ErrorParagraph>}
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
