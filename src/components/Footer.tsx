import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MarsAILogo } from './MarsAILogo';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-[#2A3142] bg-[#1A1F2E]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-3">
            <MarsAILogo />
            <p className="text-muted-foreground text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-card-foreground text-sm font-medium">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.submit')}
                </Link>
              </li>
              <li>
                <Link to="/jury" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.jury')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h4 className="text-card-foreground text-sm font-medium">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.legal.notice')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('footer.gdpr')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-card-foreground text-sm font-medium">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@marsai.fr"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  contact@marsai.fr
                </a>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">Marseille, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border/30 mt-8 border-t pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} marsAI. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
