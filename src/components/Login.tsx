import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { apiRequest } from '../lib/api';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '../schemas/login.schema';
import Button from './ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from './ui/form';
import type { User } from '@/types/auth';
import type { z } from 'zod';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const schema = loginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  type LoginFormValues = z.infer<typeof schema>;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await apiRequest<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      authLogin(result.token, result.user);
      navigate('/');
    } catch (err) {
      console.error('Erreur de connexion :', err);
      alert(err instanceof Error ? err.message : t('form.connection.error'));
    }
  };

  return (
    <Form noValidate={true} className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">{t('form.title')}</h2>
        <p className="text-muted-foreground">{t('form.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@example.com"
            {...register('email')}
            className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.email && <ErrorParagraph>{errors.email.message as string}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            {...register('password')}
            className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.password && <ErrorParagraph>{errors.password.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <Link to="/" className="text-primary border-none text-sm">
        {t('form.forgot_pass')}
      </Link>

      <Button type="submit" variant="purple" disabled={isSubmitting}>
        {isSubmitting ? t('common.loading') : t('button.signin')}
      </Button>
    </Form>
  );
};
export default Login;
