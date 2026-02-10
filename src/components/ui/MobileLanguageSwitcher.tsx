import { useTranslation } from 'react-i18next';

export function MobileLanguageSwitcher() {
  const { i18n } = useTranslation();

  // Helper to change style based on active language
  const getButtonClass = (lang: string) => {
    const isActive = i18n.language === lang;
    return `px-1.5 py-0.5 text-xs rounded transition-colors ${
      isActive
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
