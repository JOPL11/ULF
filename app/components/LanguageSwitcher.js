'use client';

import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹' },
];

export default function LanguageSwitcher() {
  const { language: currentLang, changeLanguage } = useLanguage();

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
  };
  
  const isActive = (langCode) => currentLang === langCode;

  return (
    <div className={styles.languageSwitcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.flagButton} ${isActive(lang.code) ? styles.active : ''}`}
          onClick={() => handleLanguageChange(lang.code)}
          title={lang.name}
          aria-label={`Switch to ${lang.name}`}
          aria-pressed={isActive(lang.code)}
        >
          {lang.flag}
        </button>
      ))}
      <div className={styles.logoContainer}>
        <Image 
          src="/images/ulf.png" 
          alt="ULF Logo" 
          width={175} 
          height={175}
          className={styles.logo}
          priority
        />
      </div>
    </div>
  );
}
