import { useState } from 'react';
import { Brain, Send, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormGroup, Label, TextArea } from '@/components/ui/Form';

// Helper to safely extract the YouTube ID from various URL formats
const getYouTubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

export default function FilmEvaluator({ film }: { film: any }) {
  const [scores, setScores] = useState({ creativity: 1, technical: 1, narrative: 1 });
  const [comment, setComment] = useState('');

  const averageScore = Math.round((scores.creativity + scores.technical + scores.narrative) / 3);

  if (!film) return <div className="flex h-full items-center justify-center text-slate-500">Sélectionnez un film</div>;

  const videoId = getYouTubeId(film.yt_url);

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <Card variant="dashboard">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">{film.title}</h1>
            {/* Note: Director name is not in movie table, only director_id. need to join the users table later if you want the name! */}
            <p className="text-sm text-slate-400">
              Language: {film.main_language} • Duration: {film.duration}s
            </p>
          </div>
          <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-medium">
            {film.status === 'pending' ? 'Pending' : film.status}
          </span>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe src={`https://www.youtube.com/embed/${videoId}`} className="h-full w-full border-0" allowFullScreen />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-white">Synopsis</h3>
          <p className="text-sm text-slate-400">{film.synopsis_fr}</p>
        </div>
      </Card>

      <Card variant="dashboard">
        <div className="text-primary mb-1 flex items-center gap-2">
          <Brain className="size-5" />
          <h2 className="text-lg font-semibold text-white">Carte d'Identité IA</h2>
        </div>
        <p className="mb-6 text-sm text-slate-400">Outils et méthodologie utilisés</p>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              label: 'Type de Classification IA',
              value:
                film.ia_type === '100' ? '100% IA' : film.ia_type === 'hybrid' ? 'Production Hybride' : film.ia_type,
              active: !!film.ia_type,
            },
            {
              label: 'Outils Utilisés (Stack)',
              value: film.stack || 'Non renseigné',
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
          <span className="mb-2 block text-xs text-slate-500">Méthodologie Créative</span>
          <p className="text-sm leading-relaxed text-slate-300">
            {film.methodology || 'Aucune méthodologie détaillée.'}
          </p>
        </Card>
      </Card>

      <Card className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
        <div className="text-primary mb-6 flex items-center gap-2">
          <Star className="size-5" />
          <h2 className="text-lg font-semibold text-white">Votre Évaluation</h2>
        </div>

        <div className="mb-10 rounded-xl border border-slate-800 bg-slate-950/50 py-6 text-center">
          <p className="text-sm text-slate-500">Note Moyenne (Règle des 3)</p>
          <div className="text-primary my-2 text-4xl font-bold">
            {averageScore} <span className="text-xl text-slate-500">/10</span>
          </div>
          <p className="text-xs text-slate-400">
            Créativité: {scores.creativity} | Technique: {scores.technical} | Narration: {scores.narrative}
          </p>
        </div>

        <div className="space-y-10">
          {[
            {
              id: 'creativity',
              label: '1. Créativité & Innovation',
              desc: "Originalité du concept, usage innovant de l'IA",
            },
            {
              id: 'technical',
              label: '2. Qualité Technique',
              desc: 'Maîtrise des outils IA, qualité visuelle et sonore',
            },
            { id: 'narrative', label: '3. Narration & Impact', desc: "Cohérence de l'histoire, émotion, message" },
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
                    <span>1 - Faible</span>
                    <span className="text-primary font-medium">Moyen</span>
                    <span>10 - Excellent</span>
                  </div>
                  <p className="text-xs text-slate-400">{slider.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <FormGroup>
            <Label className="text-sm text-white">Private Internal Comments</Label>
            <TextArea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Share your thoughts for deliberation..."
              className="mt-2 min-h-25 bg-slate-950 text-white"
            />
            <p className="mt-2 text-xs text-slate-500">These comments are confidential</p>
          </FormGroup>
          <Button variant="purple" className="mt-6 flex w-full items-center justify-center gap-2 py-3">
            <Send className="size-4" /> Submit Rating
          </Button>
        </div>
      </Card>
    </div>
  );
}
