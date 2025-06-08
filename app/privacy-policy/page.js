'use client';

import { useLanguage } from '../context/LanguageContext';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === 'es' ? '1. Recopilación de Información' : '1. Information We Collect'}</h2>
          <p>
            {language === 'es' 
              ? 'Recopilamos información que nos proporcionas directamente, incluyendo tu nombre, dirección de correo electrónico y cualquier otra información que nos envíes a través de formularios en nuestro sitio web.'
              : 'We collect information you provide directly to us, including your name, email address, and any other information you submit through forms on our website.'}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === 'es' ? '2. Uso de la Información' : '2. How We Use Your Information'}</h2>
          <p>
            {language === 'es'
              ? 'Utilizamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, comunicarnos contigo y personalizar tu experiencia.'
              : 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience.'}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === 'es' ? '3. Compartir Información' : '3. Information Sharing'}</h2>
          <p>
            {language === 'es'
              ? 'No compartimos tu información personal con terceros, excepto según se describe en esta política o cuando tengamos tu autorización.'
              : 'We do not share your personal information with third parties except as described in this policy or when we have your permission.'}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === 'es' ? '4. Seguridad' : '4. Security'}</h2>
          <p>
            {language === 'es'
              ? 'Implementamos medidas de seguridad para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.'
              : 'We implement security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.'}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === 'es' ? '5. Cambios en esta Política' : '5. Changes to This Policy'}</h2>
          <p>
            {language === 'es'
              ? 'Podemos actualizar nuestra Política de Privacidad periódicamente. Te notificaremos de cualquier cambio publicando la nueva política en esta página.'
              : 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.'}
          </p>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.contactTitle}>{language === 'es' ? 'Contáctanos' : 'Contact Us'}</h2>
          <p>
            {language === 'es'
              ? 'Si tienes preguntas sobre esta Política de Privacidad, por favor contáctanos en ulffestival2025@gmail.com'
              : 'If you have any questions about this Privacy Policy, please contact us at ulffestival2025@gmail.com'}
          </p>
        </section>
      </main>
    </div>
  );
}
