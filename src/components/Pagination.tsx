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

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 mb-6 flex items-center justify-center gap-2">
      <Button
        variant="default"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Précédent
      </Button>

      <div className="mx-2 flex gap-2">
        {pages.map(page => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={page === currentPage ? 'purple' : 'default'}
            className={`flex h-10! w-10! shrink-0 items-center justify-center rounded-lg p-0 ${
              page === currentPage ? 'hover:bg-primary/90' : ''
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="default"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Suivant
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
