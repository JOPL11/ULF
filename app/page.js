"use client";

import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import footerStyles from "./footer.module.css";
import dynamic from 'next/dynamic';
import LanguageSwitcher from './components/LanguageSwitcher';
import Sun from './components/Sun';
import { useLanguage } from './context/LanguageContext';
import { getTranslations } from './translations/common';

const HeroScene = dynamic(() => import('./components/HeroScene'), {
  ssr: false,
});

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <div className={styles.page}>
      <LanguageSwitcher />
      <Sun />
      <div className={styles.contentWrapper}>
        <div className={styles.pageContent}>
          <main className={styles.main}>
            <div className={styles.heroContainer}>
              <HeroScene />
            </div>
            
            <div className={styles.headlineContainer}>
              <h1 className={styles.headline}>
                {t.heroTitle}
              </h1>
              <div className={styles.subheadline}>
                <h2 className={styles.subheadlineTitle}>{t.mainTitle}</h2>
                
                <p>{t.mainDescription}</p>
                
                <h3 className={styles.sectionTitle}>{t.haitiTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.haitiDescription }}></p>
                
                <h3 className={styles.sectionTitle}>{t.culinaryTitle}</h3>
                <p>{t.culinaryIntro}</p>
                <ul className={styles.dishList}>
                  {t.culinaryItems.map((item, index) => (
                    <li key={index}>
                      <strong>{item.country}:</strong> {item.dishes}
                    </li>
                  ))}
                </ul>
                <p className={styles.centeredText}><em>{t.culinaryUnity}</em></p>
                
                <h3 className={styles.sectionTitle}>{t.musicTitle}</h3>
                <ul className={styles.competitionList}>
                  {t.competitions.map((comp, index) => (
                    <li key={index}>
                      {comp.emoji} <strong>{comp.title}</strong> – {comp.description}
                    </li>
                  ))}
                </ul>
                
                <h3 className={styles.sectionTitle}>{t.reunionTitle}</h3>
                <p>{t.reunionIntro}</p>
                <ul className={styles.checklist}>
                  {t.reunionItems.map((item, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: `✔ ${item}` }}></li>
                  ))}
                </ul>
                
                <div className={styles.importantInfo}>
                  <p>📍 <strong>{t.importantInfo.edition}</strong></p>
                  <p>{t.importantInfo.description}</p>
                  
                  <div className={styles.ctaBox}>
                    <p>🎟️ <strong>{t.importantInfo.tickets}</strong> [Insert Link]</p>
                    <p>🏨 <strong>{t.importantInfo.hotels}</strong></p>
                  </div>
                  
                  <p className={styles.closingText}>{t.importantInfo.closing}</p>
                </div>
                
                <p>
                  <strong>
                    <svg width="24" height="16" viewBox="0 0 24 16" style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginRight: '8px',
                      marginBottom: '2px',
                      overflow: 'visible'
                    }}>
                      <rect width="24" height="8" x="0" y="0" fill="#00209F" />
                      <rect width="24" height="8" x="0" y="8" fill="#D21034" />
                      <path 
                        d="M12 5.5C11.5 4.5 10.5 4 9.5 4C7.5 4 6 5.5 6 7.5C6 10 12 13 12 13C12 13 18 10 18 7.5C18 5.5 16.5 4 14.5 4C13.5 4 12.5 4.5 12 5.5Z" 
                        fill="white" 
                        stroke="white" 
                        strokeWidth="0.5"
                        style={{
                          transform: 'scale(0.8) translate(1.5px, 1px)'
                        }}
                      />
                    </svg>
                    {t.footer.title}
                  </strong>
                  <br />
                  {t.footer.description}
                </p>
                
                <p>
                  📍 <strong>{t.footer.whereWhen}</strong> {t.footer.locationDate}<br />
                  🎟️ <strong>{t.footer.tickets}</strong> {t.footer.ticketLink}
                </p>
                
                <p>{t.footer.closing}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <h2 className={styles.formHeadline}>{t.form.title}</h2>
              <p className={styles.formSubheadline}>{t.form.subtitle}</p>
              <div className={styles.formGroup}>
                <label htmlFor="name">{t.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.inputField}
                  placeholder={t.form.namePlaceholder}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">{t.form.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.inputField}
                  placeholder={t.form.emailPlaceholder}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">{t.form.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.inputField} ${styles.textareaField}`}
                  placeholder={t.form.messagePlaceholder}
                  rows="4"
                />
              </div>
              
              <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  name="gdprConsent"
                  required
                  className={styles.checkboxInput}
                />
                <label htmlFor="gdpr-consent" className={styles.checkboxLabel}>
                  {language === 'es' 
                    ? 'Acepto recibir actualizaciones por correo electrónico de Union of Love Festival. Entiendo que puedo cancelar mi suscripción en cualquier momento haciendo clic en el enlace en el pie de página de nuestros correos electrónicos. Ver nuestra '
                    : 'I agree to receive email updates from Union of Love Festival. I understand that I can unsubscribe at any time by clicking the link in the footer of our emails. View our '}
                  <a href="/privacy-policy" className={styles.privacyLink} target="_blank" rel="noopener noreferrer">
                    {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                  </a>
                  .
                </label>
              </div>
              
              <div className={styles.formGroup}>
                <button type="submit" className={styles.submitButton}>
                  {t.form.submit}
                </button>
              </div>
            </form>
            
            <footer className={footerStyles.footer}>
              <div className={footerStyles.footerContent}>
                <div className={footerStyles.footerSection}>
                  <h3>{language === 'es' ? 'Sobre Nosotros' : 'About Us'}</h3>
                  <p>{language === 'es' ? 'Celebrando la comida, la música y la unidad de todo el mundo.' : 'Celebrating food, music, and unity from around the world.'}</p>
                </div>
                <div className={footerStyles.footerSection}>
                  <h3>{language === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}</h3>
                  <ul>
                    <li><a href="#">{language === 'es' ? 'Inicio' : 'Home'}</a></li>
                    <li><a href="#">{language === 'es' ? 'Artistas' : 'Lineup'}</a></li>
                    <li><a href="mailto:ulffestival2025@gmail.com?subject=Union of Love Festival / Linyon Lanmou Festival">
                      {language === 'es' ? 'Contacto' : 'Contact'}
                    </a></li>
                  </ul>
                </div>

                <div className={footerStyles.footerSection}>
                  <h3>{language === 'es' ? 'Síguenos' : 'Follow Us'}</h3>
                  <ul className={footerStyles.socialList}>
                    <li>
                      <a href="https://www.instagram.com/ulffestival?igsh=MXZocWFqY3ZyamVyYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                        <span className={footerStyles.socialEmoji}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.987 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12.001 0z" fill="currentColor"/>
                            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" fill="currentColor"/>
                            <circle cx="18.406" cy="5.594" r="1.44" fill="currentColor"/>
                          </svg>
                        </span> Instagram
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/share/r/1AjTAhfBj6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                        <span className={footerStyles.socialEmoji}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.676C0 23.407 0.593 24 1.325 24H12.82V14.706H9.692V11.084H12.82V8.413C12.82 5.313 14.713 3.625 17.479 3.625C18.804 3.625 19.942 3.724 20.274 3.768V7.008H18.356C16.852 7.008 16.561 7.724 16.561 8.772V11.085H20.148L19.681 14.707H16.561V24H22.677C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z" fill="currentColor"/>
                          </svg>
                        </span> Facebook
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tiktok.com/@ulffestival?_r=1&_d=e2ml0lkbea18d1&sec_uid=MS4wLjABAAAAw6BisJ7OLo9KzWS1rYHXN3PQXNefzy_IMUXM-bFACiopskEfwk2GNaLVJ8Uqrzdb&share_author_id=6765171445239153670&sharer_language=en&source=h5_m&u_code=d9g587lhc2md8l&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAAw6BisJ7OLo9KzWS1rYHXN3PQXNefzy_IMUXM-bFACiopskEfwk2GNaLVJ8Uqrzdb&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=6765171445239153670&share_link_id=E9F81808-C582-471E-AEE0-44054A79ED93&share_app_id=1233" target="_blank" rel="noopener noreferrer">
                        <span className={footerStyles.socialEmoji}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.53 0.02C13.4 0 14.27 0 15.14 0.01C15.5 3.07 17.09 3.68 18.47 3.82C18.76 2.5 19.42 1.24 20.49 0.32C19.57 3.11 18.27 4.75 16.11 5.83V10.45C15.91 16.4 11.32 21.23 5.33 20.96C3.24 20.91 1.39 20.08 0 18.74C2.2 19.97 4.65 20.24 6.58 19.37C4.93 17.92 4.78 15.4 5.64 13.71C6.41 12.61 7.6 11.9 8.96 11.78C9.31 11.76 9.66 11.79 10 11.86V7.32C7.36 6.82 5.62 9.3 6.17 11.92C6.5 11.29 6.99 10.78 7.54 10.4C8.7 9.5 10.45 9.2 11.56 9.82C11.86 7.17 12.54 4.55 12.54 1.73C12.54 1.22 12.54 0.72 12.53 0.22V0.02Z" fill="currentColor"/>
                          </svg>
                        </span> TikTok
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span className={footerStyles.socialEmoji}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 15.5H13.5V10.5H10.5V8.5H15.5V15.5Z" fill="currentColor"/>
                          </svg>
                        </span> Bluesky
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span className={footerStyles.socialEmoji}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.46 6.57C21.69 6.92 20.86 7.15 20 7.24C20.88 6.7 21.56 5.87 21.88 4.88C21.05 5.38 20.13 5.75 19.16 5.95C18.37 5.1 17.26 4.58 16 4.58C13.65 4.58 11.73 6.5 11.73 8.85C11.73 9.17 11.77 9.49 11.84 9.8C8.28 9.62 5.11 7.88 3 5.23C2.64 5.85 2.42 6.58 2.42 7.36C2.42 8.83 3.17 10.12 4.33 10.82C3.62 10.8 2.96 10.61 2.38 10.3C2.38 10.32 2.38 10.34 2.38 10.36C2.38 12.39 3.86 14.09 5.82 14.48C5.47 14.57 5.1 14.62 4.72 14.62C4.45 14.62 4.19 14.59 3.93 14.53C4.46 16.2 5.99 17.43 7.84 17.47C6.43 18.58 4.58 19.22 2.56 19.22C2.22 19.22 1.88 19.2 1.54 19.16C3.44 20.36 5.7 21.03 8.12 21.03C16 21.03 20.33 14.67 20.33 9.33C20.33 9.17 20.33 9 20.32 8.84C21.16 8.27 21.88 7.49 22.46 6.57Z" fill="currentColor"/>
                          </svg>
                        </span> Twitter
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={footerStyles.footerSection}>
                  <h3>{language === 'es' ? 'Contáctanos' : 'Contact Us'}</h3>
                  <p>Email: ulffestival2025@gmail.com</p>
                 {/* <p>{language === 'es' ? 'Teléfono' : 'Phone'}: (123) 456-7890</p> */}
                </div>
              </div>
              <div className={footerStyles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} {language === 'es' ? 'Union of Love Festival' : 'Union of Love Festival'}. 
                {language === 'es' ? ' Todos los derechos reservados.' : ' All rights reserved.'}</p>
                <p>{language === 'es' ? 'Hecho con ❤️ y 🎶 por el Equipo de ULF' : 'Made with ❤️ and 🎶 by the ULF Team'}</p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
