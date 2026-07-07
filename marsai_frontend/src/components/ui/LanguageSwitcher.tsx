import { useTranslation } from 'react-i18next';
import { Check, Globe } from 'lucide-react';
import { DropdownContent, DropdownItem, DropdownMenu, DropdownTrigger } from './DropdownMenu';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu defaultValue={i18n.language}>
      {/* Le Trigger utilise automatiquement notre composant Button interne */}
      <DropdownTrigger className="w-fit gap-2">
        <Globe className="text-muted-foreground h-4 w-4" aria-hidden="true" />
        <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
      </DropdownTrigger>

      <DropdownContent className="w-32">
        <DropdownItem value="fr" onClick={() => i18n.changeLanguage('fr')}>
          <span className="flex-1">Français</span>
          {i18n.language === 'fr' && <Check className="text-primary h-4 w-4" />}
        </DropdownItem>

        <DropdownItem value="en" onClick={() => i18n.changeLanguage('en')}>
          <span className="flex-1">English</span>
          {i18n.language === 'en' && <Check className="text-primary h-4 w-4" />}
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}
