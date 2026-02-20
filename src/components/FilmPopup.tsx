import { useTranslation } from 'react-i18next';
import Badge from './ui/Badge';
import Popup from './ui/Popup';
import { MockFilm } from './utils/movieMock';

interface FilmPopupProps {
  film: MockFilm | null;
  open: boolean;
  onClose: () => void;
}

export default function FilmPopup({ open, onClose, film }: FilmPopupProps) {
  const { t } = useTranslation();
  if (!film) return null;
  return (
    <Popup open={open} onClose={onClose} className="md:max-w-4xl">
      <div className="mb-6 pr-8">
        <h2 className="text-primary mb-1 text-3xl">{film.title}</h2>
        <p className="text-muted-foreground mt-2 mb-3 text-lg">{film.director}</p>

        <div className="flex flex-wrap gap-3">
          <Badge>{film.countryName}</Badge>
          {film.officialSelection && <Badge variant="green">{t('badge.official')}</Badge>}
        </div>
      </div>

      <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={film.youtubeUrl.replace('watch?v=', 'embed/')}
          title={film.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {film.aiTools.map(tool => (
          <Badge key={tool}>{tool}</Badge>
        ))}
      </div>
    </Popup>
  );
}
