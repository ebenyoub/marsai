import HeroSection from '@/components/sections/HeroSection';
import ProgramSection from '@/components/sections/ProgramSection';
import StatsSection from '@/components/sections/StatsSection';

export function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ProgramSection/>
    </div>
  );
}
