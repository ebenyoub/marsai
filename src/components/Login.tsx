import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Button from './ui/button';
import Form, { FormGroup, Input, Label } from './ui/form';

const Login = () => {
  const { t } = useTranslation();
  return (
    <Form className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h2 className="pb-3 text-2xl font-semibold">Se Connecter</h2>
        <p className="text-muted-foreground">Connectez-vous a votre compte</p>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input id="email" type="email" placeholder="contact@example.com" />
        </FormGroup>
        <FormGroup>
          <Label required>{t('form.pass')}</Label>
          <Input id="password" type="password" placeholder="••••••••" />
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
