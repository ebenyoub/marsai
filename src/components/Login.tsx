import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import useForm from '../hooks/useForm';
import Button from './ui/button';
import Form, { FormGroup, Input, Label } from './ui/form';

const Login = () => {
  const { t } = useTranslation();
  const { handleChange, handleSubmit, values } = useForm({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = (formValues) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    })
  }

  return (
    <Form className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="pb-3 text-2xl font-semibold">Se Connecter</h2>
        <p className="text-muted-foreground">Connectez-vous a votre compte</p>
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
          />
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
          />
        </FormGroup>
      </div>
      <Link to="/" className="text-primary border-none text-sm">
        {t('form.forgot_pass')}
      </Link>
      <Button variant="purple">{t('button.signin')}</Button>
    </Form>
  );
};
export default Login;
