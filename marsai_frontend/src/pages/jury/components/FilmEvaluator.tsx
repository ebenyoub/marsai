import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Send, Star } from 'lucide-react';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { FormGroup, Label, TextArea } from '@/components/ui/form';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { FilmType } from '@/types/home';

// Helper to safely extract the YouTube ID from various URL formats
const getYouTubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

interface RatingResponse {
  success: boolean;
  data?: {
    score_creativity?: number;
    score_technical?: number;
    score_message?: number;
    comment?: string;
  };
}

type FilmEvaluatorProps = {
  film?: FilmType & {
    director_firstname?: string;
    director_lastname?: string;
  };
};

export default function FilmEvaluator({ film }: FilmEvaluatorProps) {
  const { t } = useTranslation();
  const { user, token } = useAuth();
  const [scores, setScores] = useState({ creativity: 1, technical: 1, narrative: 1 });
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!film?.id) return;
    
    // Reset first
    setScores({ creativity: 1, technical: 1, narrative: 1 });
    setComment('');
    
    const fetchExistingRating = async () => {
      try {
        const res = await apiRequest<RatingResponse>(`/rating/movie/${film.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.success && res.data) {
          const r = res.data;
          setScores({
            creativity: r.score_creativity || 1,
            technical: r.score_technical || 1,
            narrative: r.score_message || 1
          });
          setComment(r.comment || '');
        }
      } catch (err) {
        console.error("Erreur de récupération de la note existante :", err);
      }
    };
    
    fetchExistingRating();
  }, [film?.id, token]);

  const averageScore = Math.round((scores.creativity + scores.technical + scores.narrative) / 3);

  if (!film) return <div className="flex h-full items-center justify-center text-slate-500">{t('jury.video.select_film')}</div>;

  const videoId = getYouTubeId(film.yt_url);

  const handleSubmit = async () => {
    if (!user) {
      alert(t('jury.rating.login_required'));
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('/rating', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          user_id: user.id,
          movie_id: film.id,
          score_creativity: scores.creativity,
          score_technical: scores.technical,
          score_message: scores.narrative,
          comment,
          score_total: averageScore,
        }),
      });
      alert(t('jury.rating.submit_success'));
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : t('jury.rating.submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <Card variant="dashboard">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">{film.title}</h1>
            {film.director_firstname && film.director_lastname && (
              <p className="text-sm font-medium text-primary mt-1">
                {t('jury.video.director')} : {film.director_firstname} {film.director_lastname}
              </p>
            )}
            <p className="text-sm text-slate-400 mt-2">
              {t('jury.video.language')}: {film.main_language} • {t('jury.video.duration')}: {film.duration}s
            </p>
          </div>
          <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-medium">
            {film.status === 'pending'
              ? t('common.pending')
              : film.status === 'approved'
                ? t('common.validated')
                : t('common.rejected')}
          </span>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe src={`https://www.youtube.com/embed/${videoId}`} className="h-full w-full border-0" allowFullScreen />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-white">{t('jury.video.synopsis')}</h3>
          <p className="text-sm text-slate-400">{film.synopsis_fr || film.synopsis_en}</p>
        </div>
      </Card>

      <Card variant="dashboard">
        <div className="text-primary mb-1 flex items-center gap-2">
          <Brain className="size-5" />
          <h2 className="text-lg font-semibold text-white">{t('jury.ai.title')}</h2>
        </div>
        <p className="mb-6 text-sm text-slate-400">{t('jury.ai.description')}</p>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              label: t('jury.ai.classification_type'),
              value: film.ia_type,
              active: !!film.ia_type,
            },
            {
              label: t('jury.ai.stack'),
              value: film.stack || t('jury.ai.stack.empty'),
              active: !!film.stack && film.stack.trim() !== '',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 transition-colors ${
                item.active ? 'border-primary/50 bg-primary/5' : 'border-slate-800 bg-slate-900/50'
              }`}
            >
              <span className="mb-1 block text-xs text-slate-500">{item.label}</span>
              <span className={`text-sm font-medium ${item.active ? 'text-white' : 'text-slate-500'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <Card variant="dashboard" className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <span className="mb-2 block text-xs text-slate-500">{t('jury.ai.methodology')}</span>
          <p className="text-sm leading-relaxed text-slate-300">
            {film.methodology || t('jury.ai.methodology.empty')}
          </p>
        </Card>
      </Card>

      <Card className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
        <div className="text-primary mb-6 flex items-center gap-2">
          <Star className="size-5" />
          <h2 className="text-lg font-semibold text-white">{t('jury.rating.title')}</h2>
        </div>

        <div className="mb-10 rounded-xl border border-slate-800 bg-slate-950/50 py-6 text-center">
          <p className="text-sm text-slate-500">
            {t('jury.rating.average_score')} ({t('jury.rating.subtitle')})
          </p>
          <div className="text-primary my-2 text-4xl font-bold">
            {averageScore} <span className="text-xl text-slate-500">/10</span>
          </div>
          <p className="text-xs text-slate-400">
            {t('jury.rating.creativity.label')}: {scores.creativity} | {t('jury.rating.technical.label')}: {scores.technical} | {t('jury.rating.narrative.label')}: {scores.narrative}
          </p>
        </div>

        <div className="space-y-10">
          {[
            {
              id: 'creativity',
              label: `1. ${t('jury.rating.creativity.label')}`,
              desc: t('jury.rating.creativity.desc'),
            },
            {
              id: 'technical',
              label: `2. ${t('jury.rating.technical.label')}`,
              desc: t('jury.rating.technical.desc'),
            },
            {
              id: 'narrative',
              label: `3. ${t('jury.rating.narrative.label')}`,
              desc: t('jury.rating.narrative.desc'),
            },
          ].map(slider => {
            const score = scores[slider.id as keyof typeof scores];
            const fillPercentage = ((score - 1) / 9) * 100;

            return (
              <div key={slider.id} className="space-y-3">
                <div className="flex items-end justify-between">
                  <Label className="text-base font-semibold text-white">{slider.label}</Label>
                  <span className="text-primary text-2xl font-bold">
                    {score} <span className="text-sm text-slate-500">/10</span>
                  </span>
                </div>

                <div className="relative flex h-4 items-center">
                  <div className="absolute h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="bg-primary h-full transition-all duration-150 ease-out"
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>

                  <div
                    className="bg-primary absolute h-4 w-4 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-150 ease-out"
                    style={{ left: `calc(${fillPercentage}% - 8px)` }}
                  />

                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={score}
                    onChange={e => setScores({ ...scores, [slider.id]: Number(e.target.value) })}
                    className="absolute z-10 h-full w-full cursor-pointer opacity-0"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>1 - {t('jury.rating.poor')}</span>
                    <span className="text-primary font-medium">{t('jury.rating.average')}</span>
                    <span>10 - {t('jury.rating.excellent')}</span>
                  </div>
                  <p className="text-xs text-slate-400">{slider.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <FormGroup>
            <Label className="text-sm text-white">{t('jury.rating.comments')}</Label>
            <TextArea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={t('jury.rating.comments.placeholder')}
              className="mt-2 min-h-25 bg-slate-950 text-white"
            />
            <p className="mt-2 text-xs text-slate-500">{t('jury.rating.comments.hint')}</p>
          </FormGroup>
          <Button
            variant="purple"
            className="mt-6 flex w-full items-center justify-center gap-2 py-3"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send className="size-4" /> {isSubmitting ? t('jury.rating.sending') : t('jury.rating.submit')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
