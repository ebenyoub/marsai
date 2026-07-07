import { Request, Response } from 'express';
import db from '../config/database.js';
import logger from '../config/logger.js';
import CollaboratorModel from '../models/collaborator.model.js';
import DirectorModel from '../models/director.model.js';
import MovieModel from '../models/movie.model.js';
import { CollaboratorType, DirectorType } from '../types/type.js';
import { sendError } from '../utils.js';

interface SubmissionDirector {
  firstname?: string;
  lastname?: string;
  civility?: string;
  birthday?: string;
  email?: string;
  mobile?: string;
  address?: string;
  zipCode?: string;
  town?: string;
  country?: string;
  job?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  source?: string;
  newsletter?: boolean;
}

interface SubmissionMovie {
  title?: string;
  titleEn?: string;
  synopsisFr?: string;
  synopsisEn?: string;
  duration?: number;
  language?: string;
  youtubeUrl?: string;
  hasSubtitles?: boolean;
  techStack?: string;
  methodology?: string;
  iaType?: string;
  tags?: string | string[];
}

interface SubmissionPayload {
  director?: SubmissionDirector;
  movie?: SubmissionMovie;
  collaborators?: Partial<CollaboratorType>[];
}

const SOURCE_MAP: Record<string, DirectorType['question_about']> = {
  social: 'Réseaux sociaux',
  search: 'Moteur de recherche',
  word_of_mouth: 'Bouche-à-oreille',
  press: 'Presse / Média',
  festival: 'Autre festival',
  partner: 'Partenaire',
  other: 'Autre',
};

const getYouTubeId = (url: string): string | null => {
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
};

const createSubmission = async (req: Request, res: Response) => {
  if (!req.body?.data) {
    return sendError('Champ "data" manquant dans la requête multipart.', 400);
  }

  let payload: SubmissionPayload;
  try {
    payload = JSON.parse(req.body.data);
  } catch {
    return sendError('Le champ "data" ne contient pas un JSON valide.', 400);
  }

  const { director, movie, collaborators = [] } = payload;

  if (!director?.email || !director?.firstname || !director?.lastname) {
    return sendError('Informations réalisateur incomplètes (prénom, nom, email requis).', 400);
  }
  if (!movie?.title || !movie?.youtubeUrl) {
    return sendError('Informations film incomplètes (titre et URL YouTube requis).', 400);
  }

  // 1. Réalisateur : réutilisé s'il existe déjà (email unique en base)
  let directorId: number;
  const existingDirector = await DirectorModel.findByEmail(director.email);
  if (existingDirector?.id) {
    directorId = existingDirector.id;
  } else {
    const directorResult = await DirectorModel.create({
      firstname: director.firstname,
      lastname: director.lastname,
      gender: director.civility === 'Mme' ? 'Mme' : 'M.',
      birthday: director.birthday || '1970-01-01 00:00:00',
      email: director.email,
      mobile: director.mobile || '',
      address: director.address || '',
      zip_code: director.zipCode || '',
      town: director.town || '',
      country: director.country || '',
      job: director.job || '',
      youtube_url: director.youtubeUrl || '',
      instagram_url: director.instagramUrl || '',
      linkedin_url: director.linkedinUrl || '',
      facebook_url: director.facebookUrl || '',
      twitter_url: director.twitterUrl || '',
      question_about: director.source ? SOURCE_MAP[director.source] : undefined,
      newsletter: !!director.newsletter,
    });
    directorId = directorResult.insertId;
  }

  // 2. Miniature : fichier uploadé, sinon dérivée de l'URL YouTube
  const files = req.files as { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[] } | undefined;
  const videoId = getYouTubeId(movie.youtubeUrl);
  const thumbnailUrl = files?.thumbnail?.[0]
    ? `/uploads/${files.thumbnail[0].filename}`
    : videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : '';

  // 3. Film — statut 'approved' pour que le film soit visible immédiatement
  // en galerie et côté jury (pas encore d'interface de modération admin).
  const movieResult = await MovieModel.create({
    title: movie.title,
    title_en: movie.titleEn || movie.title,
    synopsis_fr: movie.synopsisFr || '',
    synopsis_en: movie.synopsisEn || '',
    duration: Number(movie.duration) || 0,
    main_language: movie.language || '',
    yt_url: movie.youtubeUrl,
    thumbnail: thumbnailUrl,
    subtitles: movie.hasSubtitles ? 'Oui' : 'Non',
    stack: movie.techStack || '',
    methodology: movie.methodology || '',
    ia_type: movie.iaType === '100' || movie.iaType === '100% IA' ? '100% IA' : 'Hybride',
    status: 'pending',
    director_id: directorId,
  });

  if (movieResult.affectedRows === 0) {
    return sendError("Échec de l'enregistrement du film.", 500);
  }
  const movieId = movieResult.insertId;

  // 4. Collaborateurs — une erreur (ex : email déjà utilisé) ne bloque pas la soumission
  for (const member of collaborators) {
    if (!member.firstname || !member.lastname || !member.email) continue;
    try {
      await CollaboratorModel.create({
        firstname: member.firstname,
        lastname: member.lastname,
        gender: member.gender === 'Mme' ? 'Mme' : 'Mr',
        email: member.email,
        job: member.job || '',
        movie_id: movieId,
      } as CollaboratorType);
    } catch (error) {
      logger.warn(`Collaborateur ${member.email} non enregistré : ${(error as Error).message}`);
    }
  }

  // 5. Galerie d'images
  for (const file of files?.gallery ?? []) {
    await db.execute('INSERT INTO image (url, created_at, movie_id) VALUES (?, NOW(), ?)', [
      `/uploads/${file.filename}`,
      movieId,
    ]);
  }

  logger.info(`Soumission enregistrée : film #${movieId} (réalisateur #${directorId}).`);

  return res.status(201).json({
    success: true,
    data: { movieId, directorId },
    message: 'Film soumis avec succès',
  });
};

export default {
  createSubmission,
};
