import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

export function Checkbox() {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
        className="pointer-events-none absolute opacity-0"
      />

      <div
        className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${checked ? 'border-purple-600 bg-purple-600' : 'border-slate-600'} `}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>

      <span className="text-sm text-white">{t('form.remember')}</span>
    </label>
  );
}
