import HeroSection from './components/HeroSection';
import ProgramSection from './components/ProgramSection';
import StatsSection from './components/StatsSection';
import VideoSection from './components/VideoSection';

export function Home() {
  return (
    <main className="">
      <HeroSection />
      <StatsSection />
      <ProgramSection />
      <VideoSection />
    </main>
  );
}
