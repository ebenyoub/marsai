import { Search } from 'lucide-react';
import Form, { Input } from './Form';

export default function SearchBar({ setQuery }: { setQuery: (query: string) => void }) {
  return (
    <Form
      className="relative mx-auto mb-8 w-full border-none bg-transparent p-0 shadow-none ring-0"
      onSubmit={e => e.preventDefault()}
    >
      <div className="group relative">
        <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 transition-colors" />
        <Input
          id="searchbar"
          type="search"
          placeholder="Rechercher un film..."
          // On envoie la valeur au parent à chaque changement
          onChange={e => setQuery(e.target.value)}
          className="focus:border-primary focus:shadow-primary h-14 w-full rounded-md border-2 border-transparent bg-white/10 pl-14 text-lg transition-all duration-200 outline-none focus:ring-0"
        />
      </div>
    </Form>
  );
}
