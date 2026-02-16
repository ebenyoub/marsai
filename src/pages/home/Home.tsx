import FilmsPageTest from '@/components/FilmPageTest';
import HeroSection from './components/HeroSection';
import ProgramSection from './components/ProgramSection';
import StatsSection from './components/StatsSection';

export function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ProgramSection />
      <FilmsPageTest />
    </div>
  );
}
