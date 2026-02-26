import SearchBar from "@/components/ui/SearchBar";

interface SidebarContentProps {
  films: any[]; 
  activeFilmId: string | null;
  onSelectFilm: (id: string) => void;
  setQuery: (query: string) => void;
}

export default function SidebarContent({ films, activeFilmId, onSelectFilm, setQuery }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col space-y-5 overflow-hidden">
      
      <div className="text-sm text-slate-400">
        0/{films.length} films évalués
      </div>

      <div>
        <SearchBar 
          setQuery={setQuery} 
          className="h-11 bg-slate-900 border-slate-800 text-sm rounded-lg"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {films.map((film) => {
          const isActive = activeFilmId === film.id.toString();
          
          return (
            <button 
              key={film.id}
              onClick={() => onSelectFilm(film.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                isActive 
                  ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'border-transparent hover:bg-slate-900/60'
              }`}
            >
              <h3 className="font-semibold text-white text-base truncate">{film.title}</h3>
              <p className="mt-1 text-sm text-slate-400 truncate">
                {film.director || `Director ID: ${film.director_id}`}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}