'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import styles from './LanguageSwitcher.module.css';
import dynamic from 'next/dynamic';

// Dynamically import flag components with no SSR to avoid window is not defined errors
const US = dynamic(() => import('country-flag-icons/react/3x2/US'), { ssr: false });
const ES = dynamic(() => import('country-flag-icons/react/3x2/ES'), { ssr: false });
const FR = dynamic(() => import('country-flag-icons/react/3x2/FR'), { ssr: false });
const HT = dynamic(() => import('country-flag-icons/react/3x2/HT'), { ssr: false });

const languages = [
  { code: 'en', name: 'English (US)', flag: US },
  { code: 'es', name: 'Español', flag: ES },
  { code: 'fr', name: 'Français', flag: FR },
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: HT },
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
          {React.createElement(lang.flag, {
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '2px'
            }
          })}
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
