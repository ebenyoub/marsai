import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Globe } from 'lucide-react';


export function MobileLanguageSwitcher() {
  const { i18n } = useTranslation();

  // Helper to change style based on active language
  const getButtonClass = (lang: string) => {
    const isActive = i18n.language === lang;
    return `px-1.5 py-0.5 text-xs rounded transition-colors ${isActive
        ? 'bg-primary text-primary-foreground' // Active Style
        : 'text-muted-foreground hover:text-foreground' // Inactive Style
      }`;
  };

  return (
    <div className="bg-card border-border flex items-center gap-1 rounded border px-2 py-1">
      {/* French Button */}
      <button
        onClick={() => i18n.changeLanguage('fr')}
        className={getButtonClass('fr')}
        aria-label="Passer en français"
      >
        FR
      </button>

      {/* English Button */}
      <button onClick={() => i18n.changeLanguage('en')} className={getButtonClass('en')} aria-label="Switch to English">
        EN
      </button>
    </div>
  );
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false); // Close menu after selection
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-card border-border hover:border-primary focus:ring-primary focus:ring-offset-background flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="text-muted-foreground h-4 w-4" aria-hidden="true" />
        <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
      </button>
      {/* Dropdown Menu */}
      {open && (
        <div
          className="bg-card border-border absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-lg border shadow-lg"
          role="menu"
          aria-orientation="vertical"
        >
          {/* French Option */}
          <button
            onClick={() => handleLanguageChange('fr')}
            className="hover:bg-primary/10 flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors"
            role="menuitem"
          >
            <span>Français</span>
            {i18n.language === 'fr' && <Check className="text-primary h-4 w-4" />}
          </button>

          {/* English Option */}
          <button
            onClick={() => handleLanguageChange('en')}
            className="hover:bg-primary/10 flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors"
            role="menuitem"
          >
            <span>English</span>
            {i18n.language === 'en' && <Check className="text-primary h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
