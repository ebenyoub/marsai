import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CollaboratorType, FilmSubmissionData } from '@/types/form';

export const useFilmSubmission = (masterData: FilmSubmissionData, members: CollaboratorType[]) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmitFinal = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- 1. VALIDATION LOCALE ---
    const isValid = members.every(m => m.firstname && m.lastname && m.job && m.email);
    if (!isValid && members.length > 0) {
      alert(t('submit.step5.incomplete', 'Veuillez remplir tous les champs de chaque membre de l\'équipe (ou supprimer les membres vides).'));
      setIsSubmitting(false);
      return;
    }

    try {
      console.warn('PREPARING CLEAN MULTIPART DATA...');

      // --- 2. INITIALISATION DU MULTIPART ---
      // FormData est une API du navigateur indispensable pour envoyer des fichiers (images) au backend
      const formData = new FormData();

      // --- 2. PAYLOAD CONSTRUCTION ---
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
          iaType: masterData.aiClassification ?? masterData.deploymentType,
          tags: masterData.semanticTags,
        },
        collaborators: members,
      };

      formData.append('data', JSON.stringify(dataPayload));

      if (masterData.thumbnail) {
        formData.append('thumbnail', masterData.thumbnail);
      }

      if (masterData.gallery && masterData.gallery.length > 0) {
        masterData.gallery.forEach((file: File) => formData.append('gallery', file));
      }

      // --- 3. SEND TO BACKEND ---
      const API_URL = import.meta.env.VITE_API_URL;
      
      if (!API_URL) {
        // Fallback to mock
        console.warn('No API URL found, falling back to mock submission.');
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const response = await fetch(`${API_URL}/api/submissions`, {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(errorBody?.message || `Submission failed (${response.status})`);
        }
      }

      // --- 4. THE CLEANUP (Crucial for the video) ---
      // Clear localStorage so the next visit starts at Step 1
      localStorage.removeItem('marsai_step');
      localStorage.removeItem('marsai_data');

      console.warn('✅ Final Payload Prepared and Storage Cleared');

      // Redirect to success page
      navigate('/success');
    } catch (error) {
      console.error('Submission Error:', error);
      alert(error instanceof Error ? error.message : t('submit.error', 'Une erreur est survenue lors de la soumission.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmitFinal, isSubmitting };
};
