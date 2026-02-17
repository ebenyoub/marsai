import { Search } from 'lucide-react';
import Form, { Input } from './form'; 

export default function SearchBar() {
    return (
        <Form 
            className="border-none bg-transparent p-0 ring-0 shadow-none m-0 max-w-4xl mx-auto w-full mb-8"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="relative w-full">
                {/* L'icône change de couleur uniquement quand l'input parent est focus */}
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors w-5 h-5 z-10 peer-focus:text-primary" />
                
                <Input
                    type="search"
                    placeholder="Rechercher un film..."
                    className="peer pl-12 h-14 w-full bg-white/10 border-2 border-transparent text-lg rounded-md transition-all duration-200 outline-none
                               /* EFFET UNIQUEMENT AU CLIC (FOCUS) */
                               focus:border-primary 
                               focus:shadow-[0_0_15px_rgba(168,85,247,0.5)] 
                               focus:ring-0"
                />
            </div>
        </Form>
    );
}