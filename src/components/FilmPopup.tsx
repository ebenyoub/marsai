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
        <h2 className="text-primary mb-1 text-3xl">{film.title}</h2>
        <p className="text-muted-foreground mt-2 mb-3 text-lg">{`${film.director_firstname} ${film.director_lastname}`}</p>

        <div className="flex flex-wrap gap-3">
          <Badge>{film.countryName}</Badge>
          {film.officialSelection && <Badge variant="green">{t('badge.official')}</Badge>}
        </div>
      </div>

      <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl}
          title={film.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {film.ai_tools.map(tool => (
          <Badge key={tool}>{tool}</Badge>
        ))}
      </div>
    </Popup>
  );
}
