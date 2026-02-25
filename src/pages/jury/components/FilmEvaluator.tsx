import { useState } from 'react';
import { Info, Star, Send } from 'lucide-react';
import Button from '@/components/ui/button';
import { FormGroup, Label, TextArea } from '@/components/ui/form';

export default function FilmEvaluator({ film }: { film: any }) {
  const [scores, setScores] = useState({ creativity: 1, technical: 1, narrative: 1 });
  const [comment, setComment] = useState('');

  const averageScore = Math.round((scores.creativity + scores.technical + scores.narrative) / 3);

  if (!film) return <div className="flex h-full items-center justify-center text-slate-500">Sélectionnez un film</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      
      {/* VIDEO & HEADER */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">{film.title}</h1>
            <p className="text-sm text-slate-400">Director: {film.director} • Duration: {film.duration}s</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
            Pending
          </span>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe src={`https://www.youtube.com/embed/${film.youtubeId}`} className="h-full w-full border-0" allowFullScreen />
        </div>
      </div>

      {/* AI IDENTITY CARD */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
        <div className="mb-4 flex items-center gap-2 text-primary">
          <Info className="size-5" />
          <h2 className="text-lg font-semibold text-white">AI Identity Card</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {['Script', 'Image', 'Video', 'Sound'].map((type) => (
            <div key={type} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <span className="block text-xs text-slate-500">{type}</span>
              <span className="font-medium text-white text-sm">Not used</span>
            </div>
          ))}
        </div>
      </div>

      {/* RATING SLIDERS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
        <div className="mb-6 flex items-center gap-2 text-primary">
          <Star className="size-5" />
          <h2 className="text-lg font-semibold text-white">Your Rating</h2>
        </div>

        <div className="mb-8 rounded-xl border border-slate-800 bg-slate-950 py-6 text-center">
          <p className="text-sm text-slate-500">Average Score (Rule of 3)</p>
          <div className="my-2 text-4xl font-bold text-primary">{averageScore} <span className="text-xl text-slate-500">/10</span></div>
        </div>

        <div className="space-y-8">
          {[
            { id: 'creativity', label: '1. Creativity & Innovation', desc: 'Concept originality, innovative AI usage' },
            { id: 'technical', label: '2. Technical Quality', desc: 'AI tools mastery, visual and sound quality' },
            { id: 'narrative', label: '3. Narrative Impact', desc: 'Story coherence, emotion, message' },
          ].map((slider) => (
            <div key={slider.id} className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-base text-white">{slider.label}</Label>
                <span className="text-lg font-bold text-primary">{scores[slider.id as keyof typeof scores]} <span className="text-sm text-slate-500">/10</span></span>
              </div>
              <input 
                type="range" min="1" max="10" 
                value={scores[slider.id as keyof typeof scores]}
                onChange={(e) => setScores({...scores, [slider.id]: Number(e.target.value)})}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-primary"
              />
              <p className="text-xs text-slate-400 mt-1">{slider.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <FormGroup>
            <Label className="text-white">Private Internal Comments</Label>
            <TextArea 
              value={comment} onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..." className="bg-slate-950 text-white"
            />
          </FormGroup>
          <Button variant="purple" className="mt-6 flex w-full items-center justify-center gap-2">
            <Send className="size-4" /> Submit Rating
          </Button>
        </div>
      </div>
    </div>
  );
}