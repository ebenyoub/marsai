import { useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false)
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng)
    setOpen(false)}
  return (
    <div className="relative">
      <button className="border px-4"
      onClick={() => setOpen(!open)}>{i18n.language}</button>
      {open && (
        <ul>
          <li><button onClick={() => handleLanguageChange('en')}>English</button></li>
          <li><button onClick={() => handleLanguageChange('fr')}>French</button></li>
        </ul>
      )}
    </div>
      // <select className=""
      //   value={i18n.language}
      //   onChange={(e) => i18n.changeLanguage(e.target.value)}
      // >
      //   <option value="en">English</option>
      //   <option value="fr">Français</option>
      // </select>
  );
}
