import { useState } from 'react';
import FilmEvaluator from './components/FilmEvaluator';
import MobileSidebar from './components/MobileSidebar';
import SidebarContent from './components/SidebarContent';

const MOCK_FILMS = [
  { id: '1', title: 'Visions de Silicium', director: 'John Smith', duration: 60, youtubeId: 'dQw4w9WgXcQ' },
  { id: '2', title: 'Rêves Numériques', director: 'Marie Dubois', duration: 120, youtubeId: 'jNQXAC9IVRw' }
];

export default function JuryDashboard() {
  const [films, setFilms] = useState(MOCK_FILMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilmId, setActiveFilmId] = useState<string>(MOCK_FILMS[0].id);

  const filteredFilms = films.filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const activeFilm = films.find(f => f.id === activeFilmId);

  const sidebarProps = {
    films: filteredFilms,
    activeFilmId,
    onSelectFilm: setActiveFilmId,
    setQuery: setSearchQuery,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      
      {/* DIRECT DESKTOP SIDEBAR - Clean and simple, hidden on mobile */}
      <aside className="hidden w-80 flex-col border-r border-slate-800 bg-slate-950 p-4 md:flex">
         <h2 className="mb-6 text-xl font-bold text-white">marsAI Jury</h2>
         <SidebarContent {...sidebarProps} />
      </aside>

      {/* RIGHT SIDE: Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        
        {/* MOBILE HEADER - Hidden on Desktop */}
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 md:hidden">
          <h1 className="text-lg font-bold text-white">marsAI Jury</h1>
          <MobileSidebar {...sidebarProps} /> 
        </header>

        {/* THE RATING PAGE (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           <FilmEvaluator film={activeFilm} />
        </div>

      </main>
    </div>
  );
}