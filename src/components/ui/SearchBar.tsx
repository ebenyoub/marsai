import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
// Adjust import based on your i18n library
import Form, { Input } from './form';
import { cn } from './utils';

interface SearchBarProps {
  setQuery: (query: string) => void;
  className?: string;
}

export default function SearchBar({ setQuery, className }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <Form
      // Removed the hardcoded 'mb-8' so the parent container handles the spacing
      className="relative mx-auto w-full border-none bg-transparent p-0 shadow-none ring-0"
      onSubmit={e => e.preventDefault()}
    >
      <div className="group relative">
        <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 transition-colors" />
        <Input
          id="searchbar"
          type="search"
          placeholder={t('search.placeholder', 'Rechercher un film...')}
          onChange={e => setQuery(e.target.value)}
          className={cn(
            'focus:border-primary focus:shadow-primary h-14 w-full rounded-md border-2 border-transparent bg-white/10 pl-14 text-lg transition-all duration-200 outline-none focus:ring-0',
            className
          )}
        />
      </div>
    </Form>
  );
}
