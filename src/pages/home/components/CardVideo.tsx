import { useTranslation } from 'react-i18next';
import PlayIcon from '@/assets/PlayIcon';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FilmWithDirector } from '@/types/home';

interface CardVideoProps {
  film: FilmWithDirector;
  onClick: () => void;
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1620712943543-bcc4628c9457?q=80&w=800&auto=format&fit=crop', // Futuristic AI/Robot human face
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', // Cyberpunk neon city
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', // Globe technology network
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop', // Cinema theater neon
  'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop', // AI technology concept
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop', // Colorful digital gradient
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop', // Futuristic android interaction
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop', // Marseille coast / Sea adapt
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop', // Dark cinematic nebula
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', // Tech chip / motherboard
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'  // Futuristic server room
];

function CardVideo({ film, onClick }: CardVideoProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Card className="group hover:shadow-primary/20 w-full overflow-hidden hover:shadow-lg" onClick={onClick}>
      <figure>
        <div className="relative">
          <img
            src={film.thumbnail}
            alt={film.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const fallbackIndex = film.id ? (film.id % fallbackImages.length) : 0;
              const fallbackUrl = fallbackImages[fallbackIndex];

              if (target.src === fallbackUrl) {
                target.src = '/src/assets/hero.jpg';
                return;
              }

              if (target.src === '/src/assets/hero.jpg') {
                return;
              }

              if (target.src.includes('maxresdefault.jpg')) {
                target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
              } else if (target.src.includes('hqdefault.jpg')) {
                target.src = target.src.replace('hqdefault.jpg', 'mqdefault.jpg');
              } else {
                target.src = fallbackUrl;
              }
            }}
            className="aspect-video object-cover transition group-hover:scale-105 w-full bg-slate-900"
          />
          {film.officialSelection && (
            <Badge className="absolute top-4 left-3" variant="green">
              {t('badge.official')}
            </Badge>
          )}
          <Badge className="text-secondary-foreground absolute top-4 right-3 border-none" variant="country">
            {film.countryName}
          </Badge>
          <div className="bg-primary/90 absolute top-1/2 left-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full group-hover:flex">
            <PlayIcon />
          </div>
        </div>
        <figcaption className="px-6 pt-4 pb-3">
          <h3 className="group-hover:text-primary">{currentLanguage === 'fr' ? film.title : film.title_en}</h3>
          <p className="text-muted-foreground mb-2 text-sm">{`${film.director_firstname} ${film.director_lastname}`}</p>
        </figcaption>
      </figure>
    </Card>
  );
}

export default CardVideo;
