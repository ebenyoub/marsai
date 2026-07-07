import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Plus, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/button';
import Form from '@/components/ui/form';
import { useFilmSubmission } from '@/hooks/useFilmSubmission';
import { collaboratorSchema } from '@/schemas/collaborator.schema';
import { CollaboratorType, FilmSubmissionData, LastStepProps } from '@/types/form';
import TeamMember from './TeamMember';

interface FormMemberProps extends LastStepProps {
  masterData: FilmSubmissionData;
  members: CollaboratorType[];
  onMembersChange: (members: CollaboratorType[]) => void;
}

type CollaboratorErrors = Record<string, Partial<Record<keyof CollaboratorType, string>>>;

export default function FormMember({ onBack, masterData, members, onMembersChange }: FormMemberProps) {
  const { t } = useTranslation();
  const [memberErrors, setMemberErrors] = useState<CollaboratorErrors>({});

  const { handleSubmitFinal, isSubmitting } = useFilmSubmission(masterData, members);

  const nextId = useMemo(() => {
    const maxNumericId = members.reduce((maxId, member) => {
      const numericId = Number(member.id);
      return Number.isFinite(numericId) ? Math.max(maxId, numericId) : maxId;
    }, 0);

    return (maxNumericId + 1).toString();
  }, [members]);

  const handleAddMember = () => {
    const newMember: CollaboratorType = {
      id: nextId,
      firstname: '',
      lastname: '',
      job: '',
      email: '',
    };
    onMembersChange([...members, newMember]);
  };

  const handleUpdateMember = (id: string, field: keyof CollaboratorType, value: string) => {
    setMemberErrors(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: undefined,
      },
    }));
    onMembersChange(members.map(m => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleDeleteMember = (id: string) => {
    setMemberErrors(prev => {
      const remaining = { ...prev };
      delete remaining[id];
      return remaining;
    });
    onMembersChange(members.filter(m => m.id !== id));
  };

  const validateMembers = () => {
    const schema = collaboratorSchema(t);
    const nextErrors: CollaboratorErrors = {};

    members.forEach(member => {
      const result = schema.safeParse(member);
      if (result.success) return;

      nextErrors[member.id] = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0];
        if (typeof field === 'string') {
          nextErrors[member.id][field as keyof CollaboratorType] = issue.message;
        }
      });
    });

    setMemberErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateMembers()) {
      event.preventDefault();
      return;
    }

    void handleSubmitFinal(event);
  };

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
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
              errors={memberErrors[member.id]}
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
