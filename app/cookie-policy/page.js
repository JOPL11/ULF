import styles from '../../app/page.module.css';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <Link 
              href="/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary)',
                textDecoration: 'none',
                fontWeight: 500,
                marginBottom: '1.5rem',
              }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Home
            </Link>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h1>Cookie Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <section>
              <h2>1. What Are Cookies</h2>
              <p>As is common practice with almost all professional websites, some sites use cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. But not in this case, not on this site.</p>
            </section>

            <section>
              <h2>2. How We Use Cookies</h2>
              <p>We don&apos;t use cookies. Fonts are hosted locally. </p>
              
              <h3>2.1 Essential Cookies</h3>
              <p>These cookies are essential to provide you with services available through our website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. But not here, because we do not use cookies.</p>
              
              <h3>2.2 Google Fonts</h3>
              <p>This site uses Google Fonts but hosts them locally, which doesn&apos;t set cookies. Yay! No cookies!{' '}
                
              </p>
              
              <h3>2.3 Email Collection</h3>
              <p>When you submit your email address through our contact forms, we store this information to respond to your inquiry. Your email will not be used for marketing purposes.</p>
            </section>

            <section>
              <h2>3. Disabling Cookies</h2>
              <p>You can prevent the setting of cookies by adjusting the settings on your browser. But as we do not use any, it does not make a difference in this case.</p>
            </section>

            <section>
              <h2>4. More Information</h2>
              <p>If you have any questions about our cookie policy, please contact us at <a href="mailto:jan.peiro@protonmail.com" style={{ color: 'var(--primary)' }}>jan.peiro@protonmail.com</a>.</p>
            </section>
            <div style={{ marginTop: '2rem', height: '200px' }}>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
