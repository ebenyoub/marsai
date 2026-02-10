import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MarsAILogo } from './MarsAILogo.js';
import { LanguageSwitcher } from './ui/LanguageSwitcher.js';
import { MobileLanguageSwitcher } from './ui/MobileLanguageSwitcher.js';
import Button from './ui/button.js';

export function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-card/95 border-border/50 sticky z-50 border-b py-3 backdrop-blur-md">
      <div className="container mx-auto flex h-full items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <div className="shrink-0">
          <MarsAILogo />
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/">
            {({ isActive }) => (
              <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.gallery')}>
                {t('nav.gallery')}
              </Button>
            )}
          </NavLink>

          <NavLink to="/submit">
            {({ isActive }) => (
              <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.submit')}>
                {t('nav.submit')}
              </Button>
            )}
          </NavLink>

          <NavLink to="/jury">
            {({ isActive }) => (
              <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.jury')}>
                {t('nav.jury')}
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin">
            {({ isActive }) => (
              <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.admin')}>
                {t('nav.admin')}
              </Button>
            )}
          </NavLink>

          <NavLink to="/super-admin">
            {({ isActive }) => (
              <Button variant={isActive ? 'active' : 'ghost'} aria-label="Super Admin">
                {t('super-admin')}
              </Button>
            )}
          </NavLink>

          {/* Separator */}
          <div className="bg-border/50 h-6 w-px" role="separator" aria-hidden="true" />

          {/* Connexion Button - Highlighted */}
          <NavLink to="/login">
            {({ isActive }) => (
              <Button variant={isActive ? 'green' : 'connexion'} aria-label={t('button.connect')}>
                <LogIn className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {t('button.connect')}
              </Button>
            )}
          </NavLink>
        </div>

        {/* Desktop Right Section - Register + Language */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Desktop Language Selector */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Right Section - Language + Burger */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Switcher */}
          <MobileLanguageSwitcher />

          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-border hover:border-primary hover:bg-primary/10 rounded-lg border p-2 transition-colors"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="text-foreground h-5 w-5" /> : <Menu className="text-foreground h-5 w-5" />}
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
            className="bg-card/98 border-border/50 overflow-hidden border-b backdrop-blur-lg md:hidden"
            role="navigation"
            aria-label="Menu mobile"
          >
            <div className="container mx-auto space-y-2 px-4 py-4">
              <NavLink to="/" onClick={closeMobileMenu}>
                {({ isActive }) => (
                  <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.gallery')}>
                    {t('nav.gallery')}
                  </Button>
                )}
              </NavLink>
              <NavLink to="/submit" onClick={closeMobileMenu}>
                {({ isActive }) => (
                  <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.submit')}>
                    {t('nav.submit')}
                  </Button>
                )}
              </NavLink>
              <NavLink to="/jury" onClick={closeMobileMenu}>
                {({ isActive }) => (
                  <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.jury')}>
                    {t('nav.jury')}
                  </Button>
                )}
              </NavLink>
              <NavLink to="/admin" onClick={closeMobileMenu}>
                {({ isActive }) => (
                  <Button variant={isActive ? 'active' : 'ghost'} aria-label={t('nav.admin')}>
                    {t('nav.admin')}
                  </Button>
                )}
              </NavLink>
              <NavLink to="/super-admin" onClick={closeMobileMenu}>
                {({ isActive }) => (
                  <Button variant={isActive ? 'active' : 'ghost'} aria-label="Super Admin">
                    Super Admin
                  </Button>
                )}
              </NavLink>

              {/* Separator */}
              <div className="bg-border/50 my-2 h-px" role="separator" aria-hidden="true" />

              {/* Connexion Button - Highlighted in Mobile */}
              <NavLink to="/login" onClick={closeMobileMenu}>
                {({ isActive }) => (
                  <Button variant={isActive ? 'green' : 'connexion'} aria-label={t('button.connect')}>
                    <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t('button.connect')}
                  </Button>
                )}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
