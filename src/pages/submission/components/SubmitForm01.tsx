import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import Button from '@/components/ui/button';
import Form, { FormGroup, Input, Label } from '@/components/ui/form';
import useForm from '@/hooks/useForm';
import { identitySchema } from '@/schemas/identityForm.schema';

function SubmitForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = identitySchema(t);

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      civility: '',
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValues: typeof values) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/directors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Creation failed:', response.status, errorData);
        return;
      }

      const data = await response.json();
      console.log('success:', data);

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error('Network error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form noValidate={true} className="m-auto w-4xl space-y-6 p-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="pb-3 text-2xl font-semibold">
            <span className="text-primary">Étape 1: </span>
            Identité
          </h2>
          <p className="text-muted-foreground">Vos informations personnelles</p>
        </div>
        <div className="space-y-2">
          <Label className="text-base">
            Civilité <span className="text-primary">*</span>
          </Label>
          <RadioGroup
            value={values.civility}
            onValueChange={value =>
              handleChange({ target: { name: 'civility', value } } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="m" />
              <Label htmlFor="m">M.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Mme" id="mme" />
              <Label htmlFor="mme">Mme</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup>
            <Label required>Prénom</Label>
            <Input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.firstname')}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </FormGroup>
          <FormGroup>
            <Label required>Nom</Label>
            <Input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.lastname')}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </FormGroup>
        </div>
        <FormGroup>
          <Label required>Date de naissance</Label>
          <Input type="date" name="birthDate" value={values.birthDate} onChange={handleChange} />
          {errors.birthDate && <p className="mt-1 text-xs text-red-500">{errors.birthDate}</p>}
        </FormGroup>
        <FormGroup>
          <Label required>Email</Label>
          <Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </FormGroup>
        <FormGroup>
          <Label required>Mobile</Label>
          <Input
            type="tel"
            name="mobile"
            value={values.mobile}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.mobile')}
          />
          {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
        </FormGroup>
        <FormGroup>
          <Label required>Adresse</Label>
          <Input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.address')}
          />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </FormGroup>
        <div className="grid grid-cols-3 gap-4">
          <FormGroup>
            <Label required>Code Postal</Label>
            <Input
              type="text"
              name="postCode"
              value={values.postCode}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.zip')}
            />
            {errors.postCode && <p className="mt-1 text-xs text-red-500">{errors.postCode}</p>}
          </FormGroup>
          <FormGroup>
            <Label required>Ville</Label>
            <Input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.city')}
            />
            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
          </FormGroup>
          <FormGroup>
            <Label required>Pays</Label>
            <Input
              type="text"
              name="country"
              value={values.country}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.country')}
            />
            {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
          </FormGroup>
        </div>
        <FormGroup>
          <Label required>Métier actuel</Label>
          <Input
            type="text"
            name="job"
            value={values.job}
            onChange={handleChange}
            placeholder={t('placeholder.submitform1.job')}
          />
          {errors.job && <p className="mt-1 text-xs text-red-500">{errors.job}</p>}
        </FormGroup>
        <div className="border-border space-y-4 border-t border-b pt-4 pb-4">
          <Label>E-réputation & Réseaux (Optionnel)</Label>
          <div className="grid grid-cols-2 gap-4">
            <FormGroup>
              <Label>Youtube</Label>
              <Input
                type="url"
                name="youtube"
                value={values.youtube}
                onChange={handleChange}
                placeholder={t('placeholder.submitform1.youtubelink')}
              />
              {errors.youtube && <p className="mt-1 text-xs text-red-500">{errors.youtube}</p>}
            </FormGroup>
            <FormGroup>
              <Label>Instagram</Label>
              <Input
                type="url"
                name="instagram"
                value={values.instagram}
                onChange={handleChange}
                placeholder={t('placeholder.submitform1.instagramlink')}
              />
              {errors.instagram && <p className="mt-1 text-xs text-red-500">{errors.instagram}</p>}
            </FormGroup>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormGroup>
              <Label>Linkedin</Label>
              <Input
                type="url"
                name="linkedin"
                value={values.linkedin}
                onChange={handleChange}
                placeholder={t('placeholder.submitform1.linkedinlink')}
              />
              {errors.linkedin && <p className="mt-1 text-xs text-red-500">{errors.linkedin}</p>}
            </FormGroup>
            <FormGroup>
              <Label>Facebook</Label>
              <Input
                type="url"
                name="facebook"
                value={values.facebook}
                onChange={handleChange}
                placeholder={t('placeholder.submitform1.facebooklink')}
              />
              {errors.facebook && <p className="mt-1 text-xs text-red-500">{errors.facebook}</p>}
            </FormGroup>
          </div>
          <FormGroup>
            <Label>X (Twitter)</Label>
            <Input
              type="url"
              name="twitter"
              value={values.twitter}
              onChange={handleChange}
              placeholder={t('placeholder.submitform1.twitterlink')}
            />
            {errors.twitter && <p className="mt-1 text-xs text-red-500">{errors.twitter}</p>}
          </FormGroup>
          <FormGroup>
            <Label required> Comment avez vous connu MarsAi ?</Label>
            <select
              name="source"
              value={values.source}
              onChange={handleChange}
              className="border-primary/30 bg-muted focus:ring-primary/40 rounded-md border px-3 py-1.5 transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50"
            >
              <option value="search">Moteur de recherche</option>
              <option value="word_of_mouth">Bouche à oreille</option>
              <option value="press">Presse / Média</option>
              <option value="festival">Autre festival</option>
              <option value="partner">Partenaire</option>
              <option value="other">Autre</option>
            </select>
            {errors.source && <p className="mt-1 text-xs text-red-500">{errors.source}</p>}
          </FormGroup>
          <FormGroup>
            <div className="flex gap-4">
              <Input type="checkbox" name="newsletter" checked={values.newsletter} onChange={handleChange} />
              <Label required>Je souhaite recevoir les Newsletter MarsAI</Label>
            </div>
            {errors.newsletter && <p className="mt-1 text-xs text-red-500">{errors.newsletter}</p>}
          </FormGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant={'active'}
            type="button" // Important: preventing submit
            onClick={() => navigate(-1)}
          >
            {t('common.previous')}
          </Button>
          <Button variant={'purple'} type="submit">
            {loading ? 'Connexion...' : t('common.next')}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default SubmitForm;
