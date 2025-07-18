import styles from '../../app/page.module.css';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Cookie Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section>
            <h2>1. What Are Cookies</h2>
            <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>
          </section>

          <section>
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
            
            <h3>2.1 Essential Cookies</h3>
            <p>These cookies are essential to provide you with services available through our website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts.</p>
            
            <h3>2.2 Google Fonts</h3>
            <p>This site uses Google Fonts, which may set cookies to store preferences and usage information. For more information on how Google uses cookies, please see Google&apos;s Privacy Policy:{' '}
              <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/privacy
              </Link>
            </p>
            
            <h3>2.3 Email Collection</h3>
            <p>When you submit your email address through our contact forms, we store this information to respond to your inquiry. Your email will not be used for marketing purposes without your explicit consent.</p>
          </section>

          <section>
            <h2>3. Disabling Cookies</h2>
            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser&apos;s &quot;Help&quot; for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>
          </section>

          <section>
            <h2>4. More Information</h2>
            <p>If you have any questions about our cookie policy, please contact us at PFP2025@gmail.com.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
