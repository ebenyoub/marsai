import { Link, useLocation } from 'react-router-dom';
import { Globe, Check, Menu, X, LogIn } from 'lucide-react';
import { Button } from '../components/ui/button.js';
import { useLanguage } from '../contexts/LanguageContext.js';
// import { MarsAILogo } from '../components/MarsAILogo.js';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MarsAILogo } from './MarsAILogo.js';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './ui/LanguageSwitcher.js';
import { MobileLanguageSwitcher } from './ui/MobileLanguageSwitcher.js';

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className=" bg-card/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="shrink-0">
          <MarsAILogo />
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              size="sm"
              className={
                isActive('/')
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : ''
              }
              aria-label={t('nav.gallery')}
            >
              {t('nav.gallery')}
            </Button>
          </Link>
          <Link to="/submit">
            <Button
              variant={isActive('/submit') ? 'default' : 'ghost'}
              size="sm"
              className={
                isActive('/submit')
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : ''
              }
              aria-label={t('nav.submit')}
            >
              {t('nav.submit')}
            </Button>
          </Link>
          <Link to="/jury">
            <Button
              variant={isActive('/jury') ? 'default' : 'ghost'}
              size="sm"
              className={
                isActive('/jury')
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : ''
              }
              aria-label={t('nav.jury')}
            >
              {t('nav.jury')}
            </Button>
          </Link>
          <Link to="/admin">
            <Button
              variant={isActive('/admin') ? 'default' : 'ghost'}
              size="sm"
              className={
                isActive('/admin')
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : ''
              }
              aria-label={t('nav.admin')}
            >
              {t('nav.admin')}
            </Button>
          </Link>
          <Link to="/super-admin">
            <Button
              variant={isActive('/super-admin') ? 'default' : 'ghost'}
              size="sm"
              className={
                isActive('/super-admin')
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : ''
              }
              aria-label="Super Admin"
            >
              Super Admin
            </Button>
          </Link>

          {/* Separator */}
          <div
            className="w-px h-6 bg-border/50"
            role="separator"
            aria-hidden="true"
          />

          {/* Connexion Button - Highlighted */}
          <Link to="/login">
            <Button
              variant={isActive('/login') ? 'default' : 'outline'}
              size="sm"
              className={`
                ${
                  isActive('/login')
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90 border-accent'
                    : 'border-accent text-accent hover:bg-accent/10 hover:border-accent/80'
                }
                font-semibold shadow-sm hover:shadow-md transition-all
              `}
              aria-label={t('button.connect')}
            >
              <LogIn className="w-4 h-4 mr-1.5" aria-hidden="true" />
              {t('button.connect')}
            </Button>
          </Link>
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
              <Link to="/" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                  size="lg"
                  className={`w-full justify-start ${isActive('/') ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                  aria-label={t('nav.gallery')}
                >
                  {t('nav.gallery')}
                </Button>
              </Link>
              <Link to="/submit" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/submit') ? 'default' : 'ghost'}
                  size="lg"
                  className={`w-full justify-start ${isActive('/submit') ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                  aria-label={t('nav.submit')}
                >
                  {t('nav.submit')}
                </Button>
              </Link>
              <Link to="/jury" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/jury') ? 'default' : 'ghost'}
                  size="lg"
                  className={`w-full justify-start ${isActive('/jury') ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                  aria-label={t('nav.jury')}
                >
                  {t('nav.jury')}
                </Button>
              </Link>
              <Link to="/admin" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/admin') ? 'default' : 'ghost'}
                  size="lg"
                  className={`w-full justify-start ${isActive('/admin') ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                  aria-label={t('nav.admin')}
                >
                  {t('nav.admin')}
                </Button>
              </Link>
              <Link to="/super-admin" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/super-admin') ? 'default' : 'ghost'}
                  size="lg"
                  className={`w-full justify-start ${isActive('/super-admin') ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                  aria-label="Super Admin"
                >
                  Super Admin
                </Button>
              </Link>

              {/* Separator */}
              <div
                className="h-px bg-border/50 my-2"
                role="separator"
                aria-hidden="true"
              />

              {/* Connexion Button - Highlighted in Mobile */}
              <Link to="/login" onClick={closeMobileMenu}>
                <Button
                  variant={isActive('/login') ? 'default' : 'outline'}
                  size="lg"
                  className={`
                    w-full justify-start
                    ${
                      isActive('/login')
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90 border-accent'
                        : 'border-accent text-accent hover:bg-accent/10 hover:border-accent/80'
                    }
                    font-semibold
                  `}
                  aria-label={t('button.connect')}
                >
                  <LogIn className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('button.connect')}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
