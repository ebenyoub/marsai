import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/ui/LanguageSwitcher';
import HeroSection from './components/sections/HeroSection';

export default function App() {
  const { t } = useTranslation();

  return (
    <div>
      <HeroSection />
    </div>
  );
}
