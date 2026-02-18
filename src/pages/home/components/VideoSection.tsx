import { useMemo, useState } from 'react';
import { Film } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import mockFilms from '@/mock/films';
import CardVideo from './CardVideo';

function VideoSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const postsPerPage = 50;

  const filteredFilms = useMemo(() => {
    const searchTerm = query.toLowerCase().trim();

    if (searchTerm.length >= 3) {
      return mockFilms.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.titleEn.toLowerCase().includes(searchTerm) ||
        movie.director.toLowerCase().includes(searchTerm)
      );
    }
    return mockFilms;
  }, [query]);

  return (
    <section className="container mx-auto my-12 px-4">
      <CardHeader>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <CardTitle variant="videoSection" icon={<Film className="text-primary" />}>
              Film en Competition
            </CardTitle>
            <CardDescription>Aperçu de notre sélection (50 films)</CardDescription>
          </div>
          <Button icon={<Film />} variant="purple">
            Voir toute la galerie
          </Button>
        </div>
        <SearchBar setQuery={setQuery} />
        <Pagination
          totalPosts={mockFilms.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardHeader>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFilms.map(film => (
          <CardVideo key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}

export default VideoSection;
