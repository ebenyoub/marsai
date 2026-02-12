import PlayIcon from '@/assets/PlayIcon';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card'
import { useTranslation } from 'react-i18next';

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
}

function CardVideo({ film }: CardVideoProps) {
    const { t } = useTranslation();

    return (
        <Card className='group w-xs h-xs overflow-hidden hover:shadow-lg hover:shadow-primary/20' >
            <figure>
                <div className='relative'>
                    <img 
                        src={film.thumbnail} 
                        alt={film.title} 
                        className='aspect-video object-cover group-hover:scale-105 transition' 
                    />
                    {
                        film.officialSelection && 
                            <Badge className='absolute top-4 left-3' variant='green'>
                                {t('badge.official')}
                            </Badge>
                    }
                    <Badge
                        className='absolute top-4 right-3 border-none text-secondary-foreground'
                        variant='country'
                    > 
                            {film.countryName}
                    </Badge>
                    <div className="absolute hidden group-hover:flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-primary/90 rounded-full">
                        <PlayIcon/>
                    </div>
                </div>
                <figcaption className='pt-4 pb-3 px-6'>
                    <h3 className='group-hover:text-primary'>{film.title}</h3> 
                    <p className='text-sm text-muted-foreground mb-2'>{film.director}</p> 
                    <div className='flex gap-2 py-0.5'>
                      {film.aiTools.map((tool, index) => <Badge key={index}>{tool}</Badge>)}  
                    </div> 
                </figcaption>
            </figure>
        </Card>
    )
}

export default CardVideo;

