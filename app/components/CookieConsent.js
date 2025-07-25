'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
    // You might want to load Google Analytics or other tracking scripts here
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.cookieConsent}>
      <div className={styles.cookieContent}>
        <p>
          We don&apos;t use cookies to enhance your experience, Fonts are hosted locally.
          By clicking &quot;Accept&quot; or &quot;Decline&quot;, you agree to our lack of using cookies as described in our
          <Link href="/cookie-policy" className={styles.cookieLink}>
            Cookie Policy
          </Link>.
        </p>
        <div className={styles.cookieButtons}>
          <button 
            onClick={declineCookies} 
            className={`${styles.cookieButton} ${styles.cookieButtonSecondary}`}
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies} 
            className={`${styles.cookieButton} ${styles.cookieButtonPrimary}`}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
