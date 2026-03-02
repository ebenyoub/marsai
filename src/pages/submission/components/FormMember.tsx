/*import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Plus, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
// import { useFilmSubmission } from '@/hooks/useFilmSubmission';
import { CollaboratorType, LastStepProps } from '@/types/form';
import TeamMember from './TeamMember';

interface FormMemberProps extends LastStepProps {
  masterData: Record<string, unknown>;
}

export default function FormMember({ onBack, masterData }: FormMemberProps) {
  const { t } = useTranslation();
  const [members, setMembers] = useState<CollaboratorType[]>([]);

  // const { handleSubmitFinal, isSubmitting } = useFilmSubmission(masterData, members);

  const nextId = useRef(1);

  const handleAddMember = () => {
    const newMember: CollaboratorType = {
      id: nextId.current.toString(),
      firstname: '',
      lastname: '',
      job: '',
      email: '',
    };
    setMembers([...members, newMember]);
  };

  const handleUpdateMember = (id: string, field: keyof CollaboratorType, value: string) => {
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <Form
      // onSubmit={handleSubmitFinal}
      className="m-auto w-full max-w-4xl space-y-8 border-none bg-transparent p-4 ring-0 md:p-10"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-primary">{t('submit.step')} 5: </span>
            {t('submit.step5.title')}
          </h2>
          <p className="text-slate-400">{t('submit.step5.description')}</p>
        </div>
        <Button
          variant="default"
          type="button"
          className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 border px-6"
          onClick={handleAddMember}
        >
          <Plus className="size-4" />
          {t('submit.step5.add')}
        </Button>
      </div>

      <div className="space-y-6">
        {members.length === 0 ? (
          <Card className="flex flex-col items-center justify-center border-dashed border-slate-800 bg-slate-900/20 py-16 text-slate-500">
            <Users className="mb-4 size-16 opacity-20" />
            <p className="text-lg font-medium text-slate-400">{t('submit.step5.empty')}</p>
          </Card>
        ) : (
          members.map((member, index) => (
            <TeamMember
              key={member.id}
              index={index}
              data={member}
              onUpdate={(field, value) => handleUpdateMember(member.id, field, value)}
              onDelete={() => handleDeleteMember(member.id)}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 pt-10">
        <Button
          variant="active"
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-slate-800 text-white"
        >
          <ChevronLeft className="size-4" />
          {t('common.previous')}
        </Button>
        <Button
          variant="purple"
          type="submit"
          disabled={isSubmitting}
          className="shadow-primary/20 flex items-center gap-2 px-8 shadow-lg"
        >
          {isSubmitting ? 'Chargement...' : t('submit.final')}
          {!isSubmitting && <ChevronRight className="size-4" />}
        </Button>
      </div>
    </Form>
  );
}
*/