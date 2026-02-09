import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MarsAILogo } from './MarsAILogo';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[#2A3142] bg-[#1A1F2E] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-3">
            <MarsAILogo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
                <Link
                  to="/submit"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.submit')}
                </Link>
              </li>
              <li>
                <Link
                  to="/jury"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.jury')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.legal.notice')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.gdpr')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@marsai.fr"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@marsai.fr
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Marseille, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} marsAI. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
