import { useTranslation } from 'react-i18next';
import PlayIcon from '@/assets/PlayIcon';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface FilmType {
  id: number;
  title: string;
  titleEn: string;
  director: string;
  country: string;
  countryName: string;
  thumbnail: string;
  aiTools: string[];
  category: string;
  officialSelection: boolean;
  youtubeUrl: string;
}

interface CardVideoProps {
  film: FilmType;
  onClick: () => void;
}

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
            className="aspect-video object-cover transition group-hover:scale-105"
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
          <h3 className="group-hover:text-primary">{currentLanguage === 'fr' ? film.title : film.titleEn}</h3>
          <p className="text-muted-foreground mb-2 text-sm">{film.director}</p>
          <div className="flex gap-2 py-0.5">
            {film.aiTools.map((tool, index) => (
              <Badge key={index}>{tool}</Badge>
            ))}
          </div>
        </figcaption>
      </figure>
    </Card>
  );
}

export default CardVideo;
