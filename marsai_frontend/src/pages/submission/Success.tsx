import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/button';

export function Success() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-500">
        <CheckCircle size={64} />
      </div>
      <h1 className="mb-4 text-4xl font-bold text-white">{t('submit.success')}</h1>
      <p className="mb-8 max-w-md text-slate-400">
        {t('submit.success.description')}
      </p>
      <Button variant="purple" onClick={() => navigate('/')}>
        {t('nav.home')}
      </Button>
    </div>
  );
}
