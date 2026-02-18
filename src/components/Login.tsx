import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Link, useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { loginSchema } from '../schemas/login.schema';
import { FormGroup, Label, Input } from './ui/Form';
import Button from './ui/Button';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = loginSchema(t);

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      email: '',
      password: '',
    },
    schema
  );

  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValues: typeof values) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);
      setApiError(null);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          setApiError(errorJson.message || t('form.connection.error'));
        } catch {
          setApiError(errorText || t('form.connection.error'));
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) setApiError(err.message);
      else setApiError('Erreur réseau, réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate={true} className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">{t('form.title')}</h2>
        <p className="text-muted-foreground">{t('form.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-5">
        {apiError && <div className="rounded-md bg-red-100 p-3 text-sm text-red-500">{apiError}</div>}

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
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </FormGroup>
      </div>

      <Link to="/" className="text-primary border-none text-sm">
        {t('form.forgot_pass')}
      </Link>

      <Button type="submit" variant="purple" disabled={loading}>
        {loading ? 'Connexion...' : t('button.signin')}
      </Button>
    </Form>
  );
};
export default Login;
