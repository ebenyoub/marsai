import { useTranslation } from 'react-i18next';
import Form, { FormGroup, Input, Label } from '@/components/ui/Form';
import Button from '@/components/ui/Button';


function SubmitForm() {
  const { t } = useTranslation();



  return (
    <>
      <Form className='m-auto w-4xl space-y-6 p-10'>
        <div>
          <h2 className="pb-3 text-2xl font-semibold"><span className='text-primary'>{t('submit.step')} 1: </span>
            {t('submit.step1.title')}</h2>
          <p className="text-muted-foreground">{t('submit.step1.description')}</p>
        </div>

        <FormGroup>
          <Label required>{t('submit.step1.civility')}</Label>
          <div className='flex gap-4'>
            <Label>{t('submit.step1.civility1')}</Label>
            <Input type="radio" className='border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50' />
            <Label>{t('submit.step1.civility2')}</Label>
            <Input type="radio" className='border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50' />
          </div>
        </FormGroup>
        <div className='grid grid-cols-2 gap-4'>
          <FormGroup>
            <Label required>{t('submit.step1.firstname')}</Label>
            <Input placeholder={t('placeholder.submitform.firstname')} />
          </FormGroup>
          <FormGroup>
            <Label required>{t('submit.step1.lastname')}</Label>
            <Input placeholder={t('placeholder.submitform.lastname')} />
          </FormGroup>
        </div>
        <FormGroup>
          <Label required>{t('submit.step1.age')}</Label>
          <Input type='date' />
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.email')}</Label>
          <Input type='email' placeholder={t('placeholder.submitform.email')} />
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.mobile')}</Label>
          <Input type='tel' placeholder={t('placeholder.submitform.mobile')} />
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.address')}</Label>
          <Input placeholder={t('placeholder.submitform.address')} />
        </FormGroup>
        <div className='grid grid-cols-3 gap-4'>
          <FormGroup>
            <Label required>{t('submit.step1.zip')}</Label>
            <Input placeholder={t('placeholder.submitform.zip')} />
          </FormGroup>
          <FormGroup>
            <Label required>{t('submit.step1.city')}</Label>
            <Input placeholder={t('placeholder.submitform.city')} />
          </FormGroup>
          <FormGroup>
            <Label required>{t('submit.step1.country')}</Label>
            <Input placeholder={t('placeholder.submitform.country')} />
          </FormGroup>
        </div>
        <FormGroup>
          <Label required>{t('submit.step1.role')}</Label>
          <Input placeholder={t('placeholder.submitform.job')} />
        </FormGroup>
        <div className='space-y-4 pt-4 bossssrder-t border-b pb-4 border-border'>
          <Label>E-réputation & Réseaux (Optionnel)</Label>
          <div className='grid grid-cols-2  gap-4'>
            <FormGroup>
              <Label>Youtube</Label>
              <Input placeholder={t('placeholder.submitform.youtubelink')} />
            </FormGroup>
            <FormGroup>
              <Label>Instagram</Label>
              <Input placeholder={t('placeholder.submitform.instagramlink')} />
            </FormGroup>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <FormGroup>
              <Label>Linkedin</Label>
              <Input placeholder={t('placeholder.submitform.linkedinlink')} />
            </FormGroup>
            <FormGroup>
              <Label>Facebook</Label>
              <Input placeholder={t('placeholder.submitform.facebooklink')} />
            </FormGroup>
          </div>
          <FormGroup>
            <Label required>X (Twitter)</Label>
            <Input placeholder={t('placeholder.submitform.twitterlink')} />
          </FormGroup>
          <FormGroup>
            <Label required> Comment avez vous connu MarsAi ?</Label>
            <select name="" id="" className='border-primary/30 bg-muted rounded-md border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 transition-all duration-200'>
              <option value="">{t('placeholder.submitform.select')}</option>
              <option value="">Moteur de recherche</option>
              <option value="">Bouche à oreille</option>
              <option value="">Presse / Média</option>
              <option value="">Autre festival</option>
              <option value="">Partenaire</option>
              <option value="">Autre</option>
            </select>
          </FormGroup>
          <FormGroup>
            <div className='flex gap-4'>
              <Input type='checkbox' />
              <Label required>Je souhaite recevoir les Newsletter MarsAI</Label>
            </div>
          </FormGroup>
        </div>

        <div className='flex justify-between'>
          <Button variant={'active'}>Retour</Button>
          <Button variant={'purple'}>Suivant</Button>
        </div>
      </Form>
    </>
  )
}

export default SubmitForm
