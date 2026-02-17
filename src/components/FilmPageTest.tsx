import { useState } from 'react';
import FilmPopup from './FilmPopup';
import Pagination from './Pagination';
import { MockFilm, mockFilms } from './utils/movieMock';

export default function FilmsPageTest() {
  const [selectedFilm, setSelectedFilm] = useState<MockFilm | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = mockFilms.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Nos Films</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentPosts.map(film => (
          <button
            key={film.id}
            onClick={() => setSelectedFilm(film)}
            className="flex h-32 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-900/20 p-4 text-center font-medium text-white transition-all hover:border-purple-500 hover:bg-purple-600"
          >
            {film.title}
          </button>
        ))}
      </div>
      <Pagination
        totalPosts={mockFilms.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <FilmPopup film={selectedFilm} open={!!selectedFilm} onClose={() => setSelectedFilm(null)} />
    </div>
  );
}
