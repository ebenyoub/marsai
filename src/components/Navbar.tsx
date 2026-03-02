import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { MarsAILogo } from './MarsAILogo';
import Button from './ui/Button';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const navLinks = [
  { path: '/', label: 'nav.gallery', protected: false },
  { path: '/submit', label: 'nav.submit', protected: true },
  { path: '/jury', label: 'nav.jury', protected: true },
  { path: '/admin', label: 'nav.admin', protected: true, adminOnly: true },
];

const mobileAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: {
    duration: 0.3,
  },
};

export function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleLinks = navLinks.filter(link => {
    if (link.protected && !isAuthenticated) return false;
    if (link.adminOnly && user?.role !== 'admin') return false;
    return true;
  });

  const renderNavLinks = (onClick?: () => void) => (
    <>
      {visibleLinks.map(link => (
        <NavLink key={link.path} to={link.path} onClick={onClick}>
          {({ isActive }) => (
            <Button variant={isActive ? 'active' : 'ghost'} className="w-full md:w-auto">
              {t(link.label)}
            </Button>
          )}
        </NavLink>
      ))}
    </>
  );

  return (
    <nav className="bg-card/95 border-border/50 sticky z-50 border-b py-3 shadow-xl shadow-white/5 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <MarsAILogo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">
          {renderNavLinks()}

          {isAuthenticated ? (
            <Button onClick={logout} variant="destructive">
              <LogOut className="mr-1.5 h-4 w-4" />
              {t('button.logout')}
            </Button>
          ) : (
            <NavLink to="/login">
              <Button variant="connexion">
                <LogIn className="mr-1.5 h-4 w-4" />
                {t('button.connect')}
              </Button>
            </NavLink>
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="...">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="md:hidden" {...mobileAnimation}>
            <div className="flex flex-col gap-2 p-4">
              {renderNavLinks(() => setMobileMenuOpen(false))}
              <div className="bg-border/50 my-2 h-px" />
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
