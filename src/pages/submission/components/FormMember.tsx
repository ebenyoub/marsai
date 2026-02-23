import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Users, X, Plus } from 'lucide-react';
import Button from '@/components/ui/button';
import Form, { FormGroup, Input, Label } from '@/components/ui/form';
import { Card } from '@/components/ui/Card';
import { LastStepProps } from '@/types/form';

export interface CollaboratorType {
  id: string; 
  firstname: string;
  lastname: string;
  job: string;
  email: string;
}

interface TeamMemberProps {
  index: number;
  data: CollaboratorType;
  onUpdate: (field: keyof CollaboratorType, value: string) => void;
  onDelete: () => void;
}

function TeamMember({ index, data, onUpdate, onDelete }: TeamMemberProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 bg-slate-900/40 p-6 rounded-xl border border-slate-800 relative">
      <button 
        type="button"
        onClick={onDelete}
        className="absolute top-4 right-4 text-slate-500 hover:text-red-500 p-1"
      >
        <X className="size-5" />
      </button>

      <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
        <h3 className="text-lg font-medium text-white">
          {t('submit.step5.collaborator')} #{index + 1}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <Label required>{t('submit.step1.firstname')}</Label>
          <Input 
            value={data.firstname}
            onChange={(e) => onUpdate('firstname', e.target.value)}
            placeholder={t('placeholder.submitform1.firstname')} 
          />
        </FormGroup>
        <FormGroup>
          <Label required>{t('submit.step1.lastname')}</Label>
          <Input 
            value={data.lastname}
            onChange={(e) => onUpdate('lastname', e.target.value)}
            placeholder={t('placeholder.submitform1.lastname')} 
          />
        </FormGroup>
      </div>
      
      <FormGroup>
        <Label required>{t('submit.step5.role')}</Label>
        <Input 
          value={data.job}
          onChange={(e) => onUpdate('job', e.target.value)}
          placeholder={t('submit.step5.role.placeholder')} 
        />
      </FormGroup>

      <FormGroup>
        <Label required>{t('submit.step5.email')}</Label>
        <Input 
          type="email"
          value={data.email}
          onChange={(e) => onUpdate('email', e.target.value)}
          placeholder={t('placeholder.submitform1.email')} 
        />
      </FormGroup>
    </div>
  );
}

// 1. We define the Props to include masterData
export interface FinalStepProps extends LastStepProps {
  masterData: any; 
}

// 2. We accept masterData here
export default function FormMember({ onBack, masterData }: FinalStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [members, setMembers] = useState<CollaboratorType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMember = () => {
    const newMember: CollaboratorType = {
      id: crypto.randomUUID(), 
      firstname: '',
      lastname: '',
      job: '',
      email: ''
    };
    setMembers([...members, newMember]);
  };

  const handleUpdateMember = (id: string, field: keyof CollaboratorType, value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  // 3. The true final submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate members locally
    const isValid = members.every(m => m.firstname && m.lastname && m.job && m.email);
    if (!isValid && members.length > 0) {
      alert(t('submit.validation.error'));
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("🚀 PREPARING CLEAN MULTIPART DATA...");
      const formData = new FormData();

      // Bundle all text data cleanly
      const dataPayload = {
        director: {
          firstname: masterData.firstName,
          lastname: masterData.lastName,
          civility: masterData.civility, 
          birthday: masterData.birthDate,
          email: masterData.email,
          mobile: masterData.mobile,
          address: masterData.address,
          zipCode: masterData.postCode,
          town: masterData.city,
          country: masterData.country,
          job: masterData.job,
          youtubeUrl: masterData.youtube,
          instagramUrl: masterData.instagram,
          linkedinUrl: masterData.linkedin,
          facebookUrl: masterData.facebook,
          twitterUrl: masterData.twitter,
          source: masterData.source,
          newsletter: masterData.newsletter,
        },
        movie: {
          title: masterData.title,
          titleEn: masterData.titleEn,
          synopsisFr: masterData.synopsis,
          synopsisEn: masterData.synopsisEn,
          duration: Number(masterData.duration),
          language: masterData.language,
          youtubeUrl: masterData.youtubeUrl,
          hasSubtitles: masterData.hasSubtitles,
          techStack: masterData.techStack,
          methodology: masterData.methodology,
          iaType: masterData.deploymentType,
          tags: masterData.semanticTags
        },
        collaborators: members 
      };

      formData.append('data', JSON.stringify(dataPayload));

      // Append files
      if (masterData.thumbnail) {
        formData.append('thumbnail', masterData.thumbnail);
      }
      if (masterData.gallery && masterData.gallery.length > 0) {
        masterData.gallery.forEach((file: File) => formData.append('gallery', file));
      }

      // --- SEND TO BACKEND ---
      // Uncomment this when your backend is ready
      // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      // const response = await fetch(`${API_URL}/api/submissions`, {
      //   method: 'POST',
      //   body: formData
      // });
      // if (!response.ok) throw new Error('Submission failed');

      console.log("✅ Final Payload Prepared:", dataPayload);
      alert("Test complet! Données prêtes pour le backend.");
      navigate('/success'); 

    } catch (error) {
      console.error('Submission Error:', error);
      alert('Une erreur est survenue lors de la soumission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form 
      onSubmit={handleSubmit}
      className="m-auto w-full max-w-4xl space-y-8 p-4 md:p-10 bg-transparent border-none ring-0"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
          className="bg-primary/10 text-primary border border-primary/20 px-6 gap-2" 
          onClick={handleAddMember}
        >
          <Plus className="size-4" />
          {t('submit.step5.add')}
        </Button>
      </div>

      <div className="space-y-6">
        {members.length === 0 ? (
          <Card className="bg-slate-900/20 border-slate-800 border-dashed py-16 flex flex-col items-center justify-center text-slate-500">
            <Users className="size-16 mb-4 opacity-20" />
            <p className="font-medium text-lg text-slate-400 italic">Aucun collaborateur ajouté</p>
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

      <div className="flex justify-between items-center pt-10 border-t border-slate-800">
        <Button 
          variant="active" 
          type="button" 
          onClick={onBack} 
          disabled={isSubmitting}
          className="gap-2 bg-slate-800 text-white"
        >
          <ChevronLeft className="size-4" />
          {t('common.previous')}
        </Button>
        <Button 
          variant="purple" 
          type="submit" 
          disabled={isSubmitting}
          className="gap-2 px-8 shadow-lg shadow-primary/20"
        >
          {isSubmitting ? 'Chargement...' : t('submit.final')}
          {!isSubmitting && <ChevronRight className="size-4" />}
        </Button>
      </div>
    </Form>
  );
}