import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './ui/Card';
import Form, { FormGroup, Input, Label } from './ui/Form';

const Login = () => {
    return (
        <Form>
            <div>
            <h2 className='text-2xl font-semibold'>Se Connecter</h2>
            <p className='text-muted-foreground'>Connectez-vous a votre compte</p>
            </div>

            <div className='flex flex-wrap gap-2 justify-evenly'>
            <FormGroup>
                <Label required>Firstname</Label>
                <Input placeholder='email'/>
            </FormGroup>
            <FormGroup>
                <Label required>Firstname</Label>
                <Input placeholder='email'/>
            </FormGroup>
            <FormGroup>
                <Label required>Firstname</Label>
                <Input placeholder='email'/>
            </FormGroup>

            </div>
        </Form>
    )
}
export default Login;