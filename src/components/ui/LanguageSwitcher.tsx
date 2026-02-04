import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

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
        className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm font-medium">
          {i18n.language.toUpperCase()}
        </span>
      </button>
      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-32 bg-card rounded-lg border border-border shadow-lg overflow-hidden z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {/* French Option */}
          <button
            onClick={() => handleLanguageChange('fr')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center justify-between"
            role="menuitem"
          >
            <span>Français</span>
            {i18n.language === 'fr' && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>

          {/* English Option */}
          <button
            onClick={() => handleLanguageChange('en')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center justify-between"
            role="menuitem"
          >
            <span>English</span>
            {i18n.language === 'en' && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
