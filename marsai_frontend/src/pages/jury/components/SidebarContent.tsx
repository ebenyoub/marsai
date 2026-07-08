import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import type { FilmType } from '@/types/home';

interface SidebarContentProps {
  films: FilmType[];
  activeFilmId: string | null;
  onSelectFilm: (id: string | number) => void;
  setQuery: (query: string) => void;
  votedMovieIds: Set<number>;
}

export default function SidebarContent({ films, activeFilmId, onSelectFilm, setQuery, votedMovieIds }: SidebarContentProps) {
  const { t } = useTranslation();
  const votedCount = films.filter(f => votedMovieIds.has(Number(f.id))).length;

  return (
    <div className="flex h-full flex-col space-y-5 overflow-hidden">
      <div className="text-sm text-slate-400">
        {votedCount}/{films.length} {t('jury.progress.films')}
      </div>

      <div>
        <SearchBar setQuery={setQuery} className="h-11 rounded-lg border-slate-800 bg-slate-900 text-sm" />
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2 pb-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {films.map(film => {
          const isActive = activeFilmId === film.id.toString();

          return (
            <button
              key={film.id}
              onClick={() => onSelectFilm(film.id)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'border-transparent hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-base font-semibold text-white">{film.title}</h3>
                {votedMovieIds.has(Number(film.id)) && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                    <CheckCircle2 className="size-3.5" /> {t('jury.sidebar.voted')}
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-sm text-slate-400">
                {film.director || `Director ID: ${film.director_id}`}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
