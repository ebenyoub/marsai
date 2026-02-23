import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MarsAILogo } from './MarsAILogo';

export function Footer() {
  const { t } = useTranslation();

  return (
<<<<<<< Updated upstream
    <footer className="mt-auto border-t border-[#2A3142] bg-[#1A1F2E]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-3">
            <MarsAILogo />
            <p className="text-muted-foreground text-sm leading-relaxed">{t('footer.tagline')}</p>
=======
    <footer className="border-t border-[#2A3142] bg-[#1A1F2E] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-3">
            {/* Mini Logo SVG */}
            <svg
              width="120"
              height="32"
              viewBox="0 0 120 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Water waves */}
              <path
                d="M2 26 Q4 24 6 26 T10 26 T14 26"
                stroke="#10B981"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />

              {/* Neural nodes */}
              <circle cx="6" cy="22" r="1" fill="#10B981" opacity="0.6" />
              <circle cx="8" cy="18" r="1.5" fill="#7C3AED" opacity="0.7" />
              <circle cx="10" cy="22" r="1" fill="#10B981" opacity="0.6" />

              {/* Connections */}
              <line
                x1="6"
                y1="22"
                x2="8"
                y2="18"
                stroke="#7C3AED"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <line
                x1="8"
                y1="18"
                x2="10"
                y2="22"
                stroke="#7C3AED"
                strokeWidth="0.5"
                opacity="0.3"
              />

              {/* Basilica icon */}
              <g transform="translate(4, 6)">
                <rect
                  x="4"
                  y="8"
                  width="6"
                  height="4"
                  fill="#7C3AED"
                  opacity="0.6"
                />
                <rect
                  x="5.5"
                  y="5"
                  width="3"
                  height="3"
                  fill="#7C3AED"
                  opacity="0.7"
                />
                <circle cx="7" cy="3.5" r="0.8" fill="#10B981" opacity="0.8" />
              </g>

              {/* Text */}
              <text
                x="20"
                y="12"
                fill="#9CA3AF"
                fontSize="6"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
                letterSpacing="0.5"
              >
                FESTIVAL
              </text>
              <text
                x="20"
                y="24"
                fill="#7C3AED"
                fontSize="14"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
              >
                mars<tspan fill="#10B981">AI</tspan>
              </text>
            </svg>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
>>>>>>> Stashed changes
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-card-foreground text-sm font-medium">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              <li>
<<<<<<< Updated upstream
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
<<<<<<< Updated upstream
                <Link to="/submit" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <Link
                  to="/submit"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
                  {t('footer.submit')}
                </Link>
              </li>
              <li>
<<<<<<< Updated upstream
                <Link to="/jury" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <Link
                  to="/jury"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
                  {t('footer.jury')}
                </Link>
              </li>
              <li>
<<<<<<< Updated upstream
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
                  {t('footer.legal.notice')}
                </a>
              </li>
              <li>
<<<<<<< Updated upstream
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
<<<<<<< Updated upstream
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
=======
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
=======
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
>>>>>>> Stashed changes
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
