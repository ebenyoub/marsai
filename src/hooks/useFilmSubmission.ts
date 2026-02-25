import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { CollaboratorType } from '@/types/form';

// Création d'un Hook personnalisé. Il prend en paramètre les données globales (masterData)
// et la liste des collaborateurs (members) depuis le composant FormMember.
export const useFilmSubmission = (masterData: any, members: CollaboratorType[]) => {
  // État local pour gérer le bouton de chargement et éviter les doubles soumissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Hook de React Router pour rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();
  // Hook de i18next pour la gestion des traductions (alertes, erreurs)
  const { t } = useTranslation();

  // La fonction principale qui sera déclenchée par le bouton "Soumettre"
  const handleSubmitFinal = async (e: React.FormEvent) => {
    // Empêche le navigateur de recharger la page par défaut lors de la soumission
    e.preventDefault();
    // Active l'état de chargement
    setIsSubmitting(true);

    // --- 1. VALIDATION LOCALE DE L'ÉQUIPE ---
    // Vérifie que chaque membre ajouté a bien tous ses champs remplis
    const isValid = members.every(m => m.firstname && m.lastname && m.job && m.email);
    // S'il y a des membres mais qu'un champ est vide, on bloque l'envoi
    if (!isValid && members.length > 0) {
      alert(t('submit.validation.error')); // Affiche un message d'erreur
      setIsSubmitting(false); // Arrête le chargement
      return; // Coupe l'exécution de la fonction ici
    }

    try {
      console.log('🚀 PREPARING CLEAN MULTIPART DATA...');

      // --- 2. INITIALISATION DU MULTIPART ---
      // FormData est une API du navigateur indispensable pour envoyer des fichiers (images) au backend
      const formData = new FormData();

      // --- 3. CRÉATION DU PAYLOAD JSON ---
      // On regroupe toutes les données textuelles dans un objet Javascript propre et bien structuré
      // Les noms des variables ici (firstname, civility, etc.) sont prêts à être lus par le backend
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
          duration: Number(masterData.duration), // Conversion explicite en nombre
          language: masterData.language,
          youtubeUrl: masterData.youtubeUrl,
          hasSubtitles: masterData.hasSubtitles, // Booléen
          techStack: masterData.techStack,
          methodology: masterData.methodology,
          iaType: masterData.deploymentType,
          tags: masterData.semanticTags,
        },
        collaborators: members, // On attache le tableau complet des collaborateurs
      };

      // --- 4. ATTACHEMENT DES DONNÉES ET FICHIERS AU FORMDATA ---
      // On convertit notre gros objet JSON en chaîne de caractères pour l'envoyer dans FormData sous la clé 'data'
      formData.append('data', JSON.stringify(dataPayload));

      // Si l'utilisateur a uploadé une miniature, on ajoute le fichier brut au FormData
      if (masterData.thumbnail) {
        formData.append('thumbnail', masterData.thumbnail);
      }

      // Si l'utilisateur a uploadé des images pour la galerie, on boucle sur le tableau
      // et on ajoute chaque fichier brut sous la même clé 'gallery'
      if (masterData.gallery && masterData.gallery.length > 0) {
        masterData.gallery.forEach((file: File) => formData.append('gallery', file));
      }

      // --- 5. ENVOI AU BACKEND (Actuellement commenté pour les tests) ---
      // Récupération de l'URL de l'API depuis les variables d'environnement
      // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      // La requête HTTP POST réelle
      // const response = await fetch(`${API_URL}/api/submissions`, {
      //   method: 'POST',
      //   body: formData // Le navigateur définira automatiquement le Content-Type à 'multipart/form-data'
      // });

      // Si le serveur répond avec une erreur (ex: erreur 500 ou 400), on déclenche le bloc catch
      // if (!response.ok) throw new Error('Submission failed');

      // --- 6. SUCCÈS ---
      console.log('✅ Final Payload Prepared:', dataPayload);
      alert('Test complet! Données prêtes pour le backend.');
      // Redirige l'utilisateur vers la page de succès
      navigate('/success');
    } catch (error) {
      // --- 7. GESTION DES ERREURS ---
      // S'il y a un problème de réseau ou une erreur du backend, ça arrive ici
      console.error('Submission Error:', error);
      alert('Une erreur est survenue lors de la soumission.');
    } finally {
      // Le bloc finally s'exécute TOUJOURS à la fin (que ce soit un succès ou une erreur)
      // On remet isSubmitting à false pour réactiver le bouton
      setIsSubmitting(false);
    }
  };

  // On renvoie la fonction de soumission et l'état de chargement pour que le composant UI puisse les utiliser
  return { handleSubmitFinal, isSubmitting };
};
