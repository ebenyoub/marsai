import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/form';
import { CollaboratorType } from '@/types/form';

interface TeamMemberProps {
  index: number;
  data: CollaboratorType;
  errors?: Partial<Record<keyof CollaboratorType, string>>;
  onUpdate: (field: keyof CollaboratorType, value: string) => void;
  onDelete: () => void;
}

export default function TeamMember({ index, data, errors, onUpdate, onDelete }: TeamMemberProps) {
  const { t } = useTranslation();

  return (
    <div className="relative space-y-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
      <button
        type="button"
        onClick={onDelete}
        aria-label={`${t('common.delete')} ${t('submit.step5.collaborator')} #${index + 1}`}
        title={`${t('common.delete')} ${t('submit.step5.collaborator')} #${index + 1}`}
        className="absolute top-4 right-4 p-1 text-slate-500 hover:text-red-500"
      >
        <X className="size-5" />
      </button>

      <div className="border-primary flex items-center gap-2 border-l-4 pl-4">
        <h3 className="text-lg font-medium text-white">
          {t('submit.step5.collaborator')} #{index + 1}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormGroup>
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input
            value={data.firstname}
            onChange={e => onUpdate('firstname', e.target.value)}
            placeholder={t('placeholder.submitform1.firstname')}
          />
          {errors?.firstname && <ErrorParagraph>{errors.firstname}</ErrorParagraph>}
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input
            value={data.lastname}
            onChange={e => onUpdate('lastname', e.target.value)}
            placeholder={t('placeholder.submitform1.lastname')}
          />
          {errors?.lastname && <ErrorParagraph>{errors.lastname}</ErrorParagraph>}
        </FormGroup>
      </div>

      <FormGroup>
        <Label required>{t('submit.step5.role')}</Label>
        <Input
          value={data.job}
          onChange={e => onUpdate('job', e.target.value)}
          placeholder={t('submit.step5.role.placeholder')}
        />
        {errors?.job && <ErrorParagraph>{errors.job}</ErrorParagraph>}
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step5.email')}</Label>
        <Input
          type="email"
          value={data.email}
          onChange={e => onUpdate('email', e.target.value)}
          placeholder={t('placeholder.submitform1.email')}
        />
        {errors?.email && <ErrorParagraph>{errors.email}</ErrorParagraph>}
      </FormGroup>
    </div>
  );
}
