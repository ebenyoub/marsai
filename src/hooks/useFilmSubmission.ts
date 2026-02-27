import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { CollaboratorType } from '@/types/form';

export const useFilmSubmission = (masterData: any, members: CollaboratorType[]) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- 1. VALIDATION LOCALE ---
    const isValid = members.every(m => m.firstname && m.lastname && m.job && m.email);
    if (!isValid && members.length > 0) {
      // Removed alert for a smoother video experience; logic just stops here
      console.warn('Validation failed: Some members have empty fields');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('🚀 PREPARING CLEAN MULTIPART DATA...');
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
          iaType: masterData.deploymentType,
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
      // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      // const response = await fetch(`${API_URL}/api/submissions`, {
      //   method: 'POST',
      //   body: formData
      // });
      // if (!response.ok) throw new Error('Submission failed');

      // --- 4. THE CLEANUP (Crucial for the video) ---
      // Clear localStorage so the next visit starts at Step 1
      localStorage.removeItem('marsai_step');
      localStorage.removeItem('marsai_data');

      console.log('✅ Final Payload Prepared and Storage Cleared');

      // Redirect to success page
      navigate('/success');
    } catch (error) {
      console.error('Submission Error:', error);
      // Fallback for errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmitFinal, isSubmitting };
};
