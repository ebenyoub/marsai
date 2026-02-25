import SearchBar from "@/components/ui/SearchBar";

interface SidebarContentProps {
  films: any[]; 
  activeFilmId: string | null;
  onSelectFilm: (id: string) => void;
  setQuery: (query: string) => void;
}

export default function SidebarContent({ films, activeFilmId, onSelectFilm, setQuery }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="pt-2">
        <SearchBar setQuery={setQuery} /> 
        {/*className="h-10 text-sm bg-slate-900 border-slate-800" */}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        <div className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
           0 / {films.length} films évalués
        </div>
        
        {/* We will map the little Film Cards here! */}
        {films.map((film) => (
          <button 
            key={film.id}
            onClick={() => onSelectFilm(film.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              activeFilmId === film.id 
                ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                : 'border-slate-800 bg-slate-900/40 hover:bg-slate-800'
            }`}
          >
            <h3 className="font-semibold text-white truncate">{film.title}</h3>
            <p className="text-sm text-slate-400 truncate">{film.director}</p>
          </button>
        ))}
      </div>
    </div>
  );
}