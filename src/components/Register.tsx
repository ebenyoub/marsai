import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/schemas/register.schema';
import useForm from '../hooks/useForm';
import Button from './ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from './ui/form';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = registerSchema(t);

  const [loading, setLoading] = useState(false);

  const { handleChange, handleSubmit, values, errors } = useForm(
    { firstname: '', lastname: '', email: '', password: '', festival_id: 1 },
    schema
  );

  const { login: authLogin } = useAuth();

  const onSubmit = async (formValues: typeof values) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Erreur de connexion');
        return;
      }

      // 2. ON UTILISE LE PROVIDER (C'est l'étape magique)
      // On passe le token et l'objet 'user' que l'on voit sur ta capture Postman
      authLogin(result.token, result.user);

      // 3. Redirection (si pas déjà gérée dans le provider)
      navigate('/');
    } catch (err) {
      console.error('Erreur réseau :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate={true} className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">{t('register_title')}</h2>
        <p className="text-muted-foreground">{t('register_subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormGroup>
          <Label required>Prénom</Label>
          <Input
            name="firstname"
            type="text"
            placeholder={t('placeholder.submitform1.firstname')}
            value={values.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <ErrorParagraph>{errors.firstname}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>Nom</Label>
          <Input
            name="lastname"
            type="text"
            placeholder={t('placeholder.submitform1.lastname')}
            value={values.lastname}
            onChange={handleChange}
          />
          {errors.lastname && <ErrorParagraph>{errors.lastname}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="contact@example.com"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.email && <ErrorParagraph>{errors.email}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="**********"
            value={values.password}
            onChange={handleChange}
            className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.password && <ErrorParagraph>{errors.password}</ErrorParagraph>}
        </FormGroup>
      </div>

      <Button type="submit" variant="purple" disabled={loading}>
        {loading ? 'Connexion...' : t('button.signin')}
      </Button>
    </Form>
  );
};
export default Register;
