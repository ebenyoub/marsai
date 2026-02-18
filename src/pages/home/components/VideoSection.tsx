import { useState } from 'react';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import mockFilms from '@/mock/films';
import CardVideo from './CardVideo';

function VideoSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 50;

  return (
    <section className="container mx-auto my-12 px-4">
      <div className="mb-12">
        <SearchBar />
      </div>

      {/* La pagination gère maintenant le texte et les boutons en haut */}
      <Pagination
        totalPosts={mockFilms.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockFilms.map(film => (
          <CardVideo key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}

export default VideoSection;
