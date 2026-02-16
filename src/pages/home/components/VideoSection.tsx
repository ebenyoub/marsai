import mockFilms from '@/mock/films';
import CardVideo from './CardVideo';

function VideoSection() {
  return (
    <section className="container mx-auto my-12 px-4">
      {/* Grille responsive magique */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockFilms.map(film => (
          <CardVideo key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}

export default VideoSection;
