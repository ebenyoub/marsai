import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Button from '@/components/ui/button';
import SidebarContent from './SidebarContent';
import type { FilmType } from '@/types/home';

interface MobileSidebarProps {
  films: FilmType[];
  activeFilmId: string | null;
  onSelectFilm: (id: string | number) => void;
  setQuery: (query: string) => void;
}

export default function MobileSidebar(props: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border-slate-700 bg-slate-800 text-white"
      >
        <Menu className="size-4" /> Films
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 bottom-0 left-0 z-50 flex w-4/5 max-w-sm flex-col border-r border-slate-800 bg-slate-950 p-4 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Films à évaluer</h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="size-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SidebarContent {...props} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
