import heroImage from '@/assets/hero.jpg'
import { useTranslation } from 'react-i18next';
export default function HeroSection () {
    const { t } = useTranslation();
    return (
        <section
        style={{ backgroundImage: `url(${heroImage})` }}
        className=" h-149 min-h-149 bg-cover bg-center over z-1">
            <div className="absolute bg-black opacity-55 size-full z-2"></div>
            <h1 className='m-auto flex justify-center items-center'>{t("hero.title")}</h1>
        </section>
    )
}