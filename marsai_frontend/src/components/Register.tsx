import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { apiRequest } from '../lib/api';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/schemas/register.schema';
import Button from './ui/button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from './ui/form';
import { User } from '@/types/auth';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const schema = registerSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      const payload = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
        festival_id: 1,
      };

      const result = await apiRequest<{ token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      authLogin(result.token, result.user);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        // console.error('Erreur d\'inscription :', err);
        alert(err.message || t('form.connection.error'));
      }
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
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform1.firstname')}
            {...register('firstName')}
          />
          {errors.firstName && <ErrorParagraph>{errors.firstName.message as string}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input
            type="text"
            placeholder={t('placeholder.submitform1.lastname')}
            {...register('lastName')}
          />
          {errors.lastName && <ErrorParagraph>{errors.lastName.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input
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
            type="password"
            placeholder="**********"
            {...register('password')}
            className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.password && <ErrorParagraph>{errors.password.message as string}</ErrorParagraph>}
        </FormGroup>

        <FormGroup>
          <Label required>{t('register.confirm_password')}</Label>
          <Input
            type="password"
            placeholder="**********"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {errors.confirmPassword && <ErrorParagraph>{errors.confirmPassword.message as string}</ErrorParagraph>}
        </FormGroup>
      </div>

      <Button type="submit" variant="purple" disabled={isSubmitting}>
        {isSubmitting ? t('common.loading') : t('button.signin')}
      </Button>
    </Form>
  );
};
export default Register;
