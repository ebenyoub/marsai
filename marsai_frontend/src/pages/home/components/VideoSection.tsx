import { useMemo, useState } from 'react';
import { Film } from 'lucide-react';
import FilmPopup from '@/components/FilmPopup';
import Pagination from '@/components/Pagination';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import { s } from '@/components/ui/utils';
import { useFetch } from '@/hooks/useFetch';
import { FilmWithDirector } from '@/types/home';
import CardVideo from './CardVideo';

export default function VideoSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedFilm, setSelectedFilm] = useState<FilmWithDirector | null>(null);

  const postsPerPage = 12; // Plus standard pour les grilles (multiple de 2, 3, 4)

  // Utilisation de ton useFetch global
  const { data: movies, isLoading, error } = useFetch<FilmWithDirector[]>('/movies');

  // Filtrage intelligent
  const filteredFilms = useMemo(() => {
    if (!movies) return [];
    const search = query.toLowerCase().trim();
    if (search.length < 3) return movies;

    return movies.filter(m => m.title.toLowerCase().includes(search) || m.title_en?.toLowerCase().includes(search));
  }, [query, movies]);

  // Calcul de la pagination
  const currentFilms = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredFilms.slice(start, start + postsPerPage);
  }, [currentPage, filteredFilms, postsPerPage]);

  if (isLoading) return <div className="py-20 text-center">Chargement des films...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Erreur : {error}</div>;

  return (
    <section className="container mx-auto my-12 space-y-8 px-4">
      <CardHeader className="flex flex-col gap-6">
        <div>
          <div>
            <CardTitle variant="videoSection" icon={<Film className="text-primary" />}>
              Films en Compétition
            </CardTitle>
            <CardDescription>
              {filteredFilms.length} film{s(filteredFilms.length)} sélectionné{s(filteredFilms.length)}
            </CardDescription>
          </div>
          <SearchBar
            setQuery={q => {
              setQuery(q);
              setCurrentPage(1);
            }}
          />
        </div>

        <Pagination
          totalPosts={filteredFilms.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardHeader>

      {/* Grille de Vidéos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentFilms.map(film => (
          <CardVideo key={film.id} film={film} onClick={() => setSelectedFilm(film)} />
        ))}
      </div>

      {/* Si aucun résultat */}
      {filteredFilms.length === 0 && (
        <p className="text-muted-foreground py-10 text-center">Aucun film ne correspond à votre recherche.</p>
      )}

      <FilmPopup film={selectedFilm} open={!!selectedFilm} onClose={() => setSelectedFilm(null)} />
    </section>
  );
}
