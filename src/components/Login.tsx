import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './ui/Card';
import Form, { FormGroup, Input, Label } from './ui/Form';
import Button from './ui/button';
import { Checkbox } from './ui/CheckBox';
import { Link } from 'react-router';

const Login = () => {
  const { t } = useTranslation();
  return (
    <Form className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h2 className="text-2xl font-semibold pb-3">Se Connecter</h2>
        <p className="text-muted-foreground">Connectez-vous a votre compte</p>
      </div>

      <div className="flex flex-col gap-5">
        <FormGroup>
          <Label required>Email</Label>
          <Input id="email" type="email" placeholder="contact@example.com" />
        </FormGroup>
        <FormGroup>
          <Label required>{t("form.pass")}</Label>
          <Input id="password" type="password" placeholder="••••••••" />
         </FormGroup>
      </div>
      <Link to="/" className='border-none text-primary text-sm'>
        {t('form.forgot_pass')}
      </Link>
        <Button variant='purple'>{t("button.signin")}</Button>
    </Form>
  );
};
export default Login;
