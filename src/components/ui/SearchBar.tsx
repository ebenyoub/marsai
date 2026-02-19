import { Search } from 'lucide-react';
import Form, { Input } from './form';

export default function SearchBar() {
  return (
    <Form
      className="m-0 mx-auto mb-8 w-full max-w-4xl border-none bg-transparent p-0 shadow-none ring-0"
      onSubmit={e => e.preventDefault()}
    >
      <div className="relative w-full">
        {/* L'icône change de couleur uniquement quand l'input parent est focus */}
        <Search className="text-muted-foreground peer-focus:text-primary absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 transition-colors" />

        <Input
          type="search"
          placeholder="Rechercher un film..."
          className="peer /* EFFET UNIQUEMENT AU CLIC (FOCUS) */ focus:border-primary h-14 w-full rounded-md border-2 border-transparent bg-white/10 pl-12 text-lg transition-all duration-200 outline-none focus:shadow-[0_0_15px_rgba(168,85,247,0.5)] focus:ring-0"
        />
      </div>
    </Form>
  );
}
