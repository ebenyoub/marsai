import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/api';
import FilmEvaluator from './components/FilmEvaluator';
import MobileSidebar from './components/MobileSidebar';
import SidebarContent from './components/SidebarContent';
import type { FilmType } from '@/types/home';

interface MoviesResponse {
  success: boolean;
  data: FilmType[];
  message?: string;
}

export default function JuryDashboard() {
  const { t } = useTranslation();
  const [films, setFilms] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await apiRequest<MoviesResponse>('/movies');

        if (result.success && result.data.length > 0) {
          setFilms(result.data);
          setActiveFilmId(result.data[0].id.toString());
        } else {
          setError(result.message || t('jury.error.no_films'));
        }
      } catch (err) {
        console.error('Erreur lors de la récupération :', err);
        setError(t('jury.error.connection'));
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [t]);

  const filteredFilms = films.filter(f => f.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  const activeFilm = films.find(f => f.id.toString() === activeFilmId);

  const sidebarProps = {
    films: filteredFilms,
    activeFilmId,
    onSelectFilm: (id: string | number) => setActiveFilmId(id.toString()),
    setQuery: setSearchQuery,
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">{t('gallery.loading')}</div>
    );
  }
  if (error && films.length === 0) {
    return <div className="flex h-screen items-center justify-center bg-slate-950 text-red-400">{error}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <aside className="hidden h-screen w-80 flex-col border-r border-slate-800 bg-slate-950 p-6 md:flex">
        <div className="mb-6 shrink-0">
          <h2 className="text-xl font-bold text-white">Interface Jury marsAI</h2>
          <p className="text-primary mt-1 text-sm">L'excellence au bout du curseur</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <SidebarContent {...sidebarProps} />
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 md:hidden">
          <h1 className="text-lg font-bold text-white">marsAI Jury</h1>
          <MobileSidebar {...sidebarProps} />
        </header>

        <div className="scrollbar flex-1 overflow-x-scroll p-4 md:p-8">
          <FilmEvaluator film={activeFilm} />
        </div>
      </main>
    </div>
  );
}
