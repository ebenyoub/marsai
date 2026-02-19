import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/button';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      {/* TEXTE À GAUCHE */}
      <p className="text-muted-foreground text-sm font-medium">
        Affichage de <span className="text-primary font-bold">{totalPosts}</span> sur {totalPosts} films (Page{' '}
        <span className="text-primary font-bold">{currentPage}</span> sur {totalPages})
      </p>

      {/* BOUTONS À DROITE */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline" // Utilisation de ta variante outline
          icon={<ChevronLeft className="h-4 w-4" />}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>

        <span className="min-w-7.5 text-center text-sm font-semibold">
          {currentPage}/{totalPages}
        </span>

        <Button
          variant="outline"
          icon={<ChevronRight className="h-4 w-4" />}
          position="right"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
