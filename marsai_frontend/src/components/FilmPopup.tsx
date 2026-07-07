import { useTranslation } from 'react-i18next';
import { FilmWithDirector } from '@/types/home';
import Badge from './ui/Badge';
import Popup from './ui/Popup';

interface FilmPopupProps {
  film: FilmWithDirector | null;
  open: boolean;
  onClose: () => void;
}

export default function FilmPopup({ open, onClose, film }: FilmPopupProps) {
  const { t } = useTranslation();

  if (!film) return null;

  const getEmbedUrl = (url: string): string => {
    if (!url) return '';

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const embedUrl = getEmbedUrl(film.yt_url);

  return (
    <Popup open={open} onClose={onClose} className="md:max-w-4xl">
      <div className="mb-6 pr-8">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h2 className="text-primary text-3xl">{film.title}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
            film.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
            film.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
          }`}>
            {film.status === 'approved' ? 'Validé' : film.status === 'rejected' ? 'Refusé' : 'En attente'}
          </span>
        </div>
        <p className="text-muted-foreground mt-2 mb-3 text-lg">{`${film.director_firstname} ${film.director_lastname}`}</p>

        <div className="flex flex-wrap gap-3">
          {film.countryName && <Badge>{film.countryName}</Badge>}
          {film.officialSelection && <Badge variant="green">{t('badge.official')}</Badge>}
        </div>
      </div>

      {embedUrl ? (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-800 rounded-xl">
          <p className="text-slate-400 mb-4 text-center">L'intégration de la vidéo n'est pas possible directement.</p>
          <a
            href={film.yt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary hover:bg-primary/95 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Ouvrir la vidéo sur YouTube/Vimeo
          </a>
        </div>
      )}

      {(film.synopsis_fr || film.synopsis_en) && (
        <div className="mb-6 bg-slate-950/40 p-4 border border-slate-800 rounded-xl">
          <h3 className="text-sm font-semibold text-slate-300 mb-1">Synopsis</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{film.synopsis_fr || film.synopsis_en}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {(film.ai_tools ?? (film.stack ? film.stack.split(',').map(tag => tag.trim()) : [])).map(tool => (
          <Badge key={tool}>{tool}</Badge>
        ))}
      </div>
    </Popup>
  );
}
