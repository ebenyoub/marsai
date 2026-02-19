import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/button';
import Form, { FormGroup, Input, Label, TextArea } from '@/components/ui/form';

function SubmitForm02() {
  const { t } = useTranslation();
  return (
    <>
      <Form className="m-auto w-4xl space-y-6 p-10">
        <div>
          <h2 className="pb-3 text-2xl font-semibold">
            <span className="text-primary">{t('submit.step')} 2: </span>
            {t('submit.step2.title')}
          </h2>
          <p className="text-muted-foreground">{t('submit.step2.description')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormGroup>
            <Label required>{t('submit.step2.title.fr')}</Label>
            <Input placeholder={t('placeholder.submitform2.title.fr')} />
          </FormGroup>

          <FormGroup>
            <Label required>{t('submit.step2.title.en')}</Label>
            <Input placeholder={t('placeholder.submitform2.title.en')} />
          </FormGroup>
        </div>
        <FormGroup>
          <Label required>{t('submit.step2.duration')}</Label>
          <Input type="number" max="60" min="0" placeholder={t('placeholder.submitform2.duration')} />
        </FormGroup>
        <FormGroup>
          <Label required>Langue parlée/principale du film</Label>
          <Input placeholder={t('placeholder.submitform2.language')} />
        </FormGroup>
        <FormGroup>
          <Label required>Tags sémantiques "Futurs souhaitables"</Label>
          <Input placeholder={t('placeholder.submitform2.tag')} />
        </FormGroup>
        <FormGroup>
          <Label required>Synopsis langue originale</Label>
          <TextArea placeholder={t('placeholder.submitform2.synopsis.fr')} />
        </FormGroup>
        <FormGroup>
          <Label required>Synopsis anglais</Label>
          <TextArea placeholder={t('placeholder.submitform2.synopsis.en')} />
        </FormGroup>
        <div className="border-border space-y-4 border-t pt-4 pb-4">
          <div className="flex justify-between">
            <Button variant={'active'}>Retour</Button>
            <Button variant={'purple'}>Suivant</Button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default SubmitForm02;
