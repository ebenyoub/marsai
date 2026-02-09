import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MarsAILogo } from './MarsAILogo.js';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './ui/LanguageSwitcher.js';
import { MobileLanguageSwitcher } from './ui/MobileLanguageSwitcher.js';
import Button from './ui/button.js';

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky z-50 bg-card/95 backdrop-blur-md border-b border-border/50 py-3">
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="shrink-0">
          <MarsAILogo />
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/">
            <Button
              variant={isActive('/gallery') ? 'active' : 'ghost'}
              aria-label={t('nav.gallery')}
            >
              {t('nav.gallery')}
            </Button>
          </NavLink>
          <NavLink to="/submit">
            <Button
              variant={isActive('/submit') ? 'active' : 'ghost'}
              aria-label={t('nav.submit')}
            >
               {t('nav.submit')}
            </Button>
          </NavLink>

          <NavLink to="/jury">
            <Button
              variant={isActive('/jury') ? 'active' : 'ghost'}
              aria-label={t('nav.jury')}
            >
              {t('nav.jury')}
            </Button>
          </NavLink>

          <NavLink to="/admin">
            <Button
              variant={isActive('/admin') ? 'active' : 'ghost'}
              aria-label={t('nav.admin')}
            >
              {t('nav.admin')}
            </Button>
          </NavLink>

          <NavLink to="/super-admin">
            <Button
              variant={isActive('/super-admin') ? 'active' : 'ghost'}
               aria-label="Super Admin"
            >
              {t('super-admin')}
            </Button>
          </NavLink>

          {/* Separator */}
          <div
            className="w-px h-6 bg-border/50"
            role="separator"
            aria-hidden="true"
          />

          {/* Connexion Button - Highlighted */}
          <NavLink to="/login">
            <Button
              variant={isActive('/login') ? 'green' : 'connexion'}
              aria-label={t('button.connect')}
            >
              <LogIn className="w-4 h-4 mr-1.5" aria-hidden="true" />
              {t('button.connect')}
            </Button>
          </NavLink>
        </div>

        {/* Desktop Right Section - Register + Language */}
        <div className="hidden md:flex items-center gap-3">
          {/* Desktop Language Selector */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Right Section - Language + Burger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Language Switcher */}
          <MobileLanguageSwitcher />

          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card/98 backdrop-blur-lg border-b border-border/50 overflow-hidden"
            role="navigation"
            aria-label="Menu mobile"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <NavLink to="/" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/') ? 'active' : 'ghost'}
                  aria-label={t('nav.gallery')}
                >
                  {t('nav.gallery')}
                </Button>
              </NavLink>
              <NavLink to="/submit" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/submit') ? 'active' : 'ghost'}
                  aria-label={t('nav.submit')}
                >
                  {t('nav.submit')}
                </Button>
              </NavLink>
              <NavLink to="/jury" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/jury') ? 'active' : 'ghost'}
                  aria-label={t('nav.jury')}
                >
                  {t('nav.jury')}
                </Button>
              </NavLink>
              <NavLink to="/admin" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/admin') ? 'active' : 'ghost'}
                  aria-label={t('nav.admin')}
                >
                  {t('nav.admin')}
                </Button>
              </NavLink>
              <NavLink to="/super-admin" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/super-admin') ? 'active' : 'ghost'}
                  aria-label="Super Admin"
                >
                  Super Admin
                </Button>
              </NavLink>

              {/* Separator */}
              <div
                className="h-px bg-border/50 my-2"
                role="separator"
                aria-hidden="true"
              />

              {/* Connexion Button - Highlighted in Mobile */}
              <NavLink to="/login" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/login') ? 'green' : 'connexion'}
                  aria-label={t('button.connect')}
                >
                  <LogIn className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('button.connect')}
                </Button>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
