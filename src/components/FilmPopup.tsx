import Popup from './ui/Popup';
import { MockFilm } from './utils/movieMock';

interface FilmPopupProps {
  film: MockFilm | null;
  open: boolean;
  onClose: () => void;
}

export default function FilmPopup({ open, onClose, film }: FilmPopupProps) {
  if (!film) return null;

  return (
    <Popup open={open} onClose={onClose} className="md:max-w-4xl">
      <div className="mb-6 pr-8">
        <h2 className="text-primary mb-1 text-3xl">{film.title}</h2>
        <p className="text-muted-foreground mt-2 mb-3 text-lg">{film.director}</p>

        <div className="flex flex-wrap gap-3">
          <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            {film.countryName}
          </span>
          {film.officialSelection && (
            <span className="rounded-md bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
              Sélection Officielle
            </span>
          )}
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
          <span
            key={tool}
            className="rounded-full border border-purple-200 bg-transparent px-3 py-1 text-xs font-medium text-purple-600"
          >
            {tool}
          </span>
        ))}
      </div>
    </Popup>
  );
}
