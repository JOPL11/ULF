"use client";

import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import footerStyles from "./footer.module.css";

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

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.pageContent}>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/poster1.jpeg"
            alt="Poster image"
            fill
            style={{
              objectFit: 'contain',
            }}
            priority
            quality={100}
          />
        </div>
        
        <div className={styles.headlineContainer}>
          <h1 className={styles.headline}>
            AWESOME QUALITY FOOD CULTURE & INTERNATIONAL CUISINE
          </h1>
          <div className={styles.subheadline}>
            <h2 className={styles.subheadlineTitle}>🎉 Harmony Fest 2025: Taste the World, Unite as One! 🌍❤️🔥</h2>
            
            <p>Get ready for a historic celebration of flavor, rhythm, and unity at the first-ever Harmony Fest—a festival where cultures collide in the best way possible! This is more than just an event; it&apos;s a movement. A place where we break bread, share stories, and build bridges through food, music, and truth.</p>
            
            <h3 className={styles.sectionTitle}>🇭🇹 Celebrating Haitian Heart &amp; Soul</h3>
            <p>Haiti&apos;s vibrant culture takes center stage with spicy <strong>griot</strong> (fried pork), savory <strong>diri ak djon djon</strong> (mushroom rice), and sweet, crispy <strong>banann peze</strong>—all made with the love and resilience that defines Haitian spirit. Let the rhythms of kompa, rara, and vodou jazz move your feet as we honor Haiti&apos;s rich history and unshakable joy.</p>
            
            <h3 className={styles.sectionTitle}>🌎 A Culinary World Tour</h3>
            <p>Your taste buds will travel across the globe with mouthwatering dishes from:</p>
            <ul className={styles.dishList}>
              <li><strong>Venezuela:</strong> Arepas, pabellón criollo</li>
              <li><strong>Dominican Republic:</strong> Mangú, sancocho</li>
              <li><strong>Colombia:</strong> Bandeja paisa, empanadas</li>
              <li><strong>Mexico:</strong> Tacos al pastor, mole</li>
              <li><strong>USA:</strong> Southern BBQ, Cajun classics</li>
              <li><strong>Europe:</strong> German bratwurst, French crêpes, Italian pasta, Spanish paella</li>
              <li><strong>The Caribbean:</strong> Jamaican jerk chicken, Martinique&apos;s accras</li>
            </ul>
            <p className={styles.centeredText}><em>This is unity on a plate.</em></p>
            
            <h3 className={styles.sectionTitle}>🎶 Live Music, Epic Competitions</h3>
            <ul className={styles.competitionList}>
              <li>🔥 <strong>Guitar & Piano Battles</strong> – Show off your skills, and the best jammer wins!</li>
              <li>💃 <strong>Dance Freestyles</strong> – Salsa, kompa, hip-hop… bring your best moves!</li>
              <li>😂 <strong>Stand-Up Comedy</strong> – Laugh together as local and international comedians drop truth bombs and good vibes.</li>
            </ul>
            
            <h3 className={styles.sectionTitle}>✊🏾 More Than a Festival—A Family Reunion</h3>
            <p>We&apos;re not just eating and dancing—we&apos;re connecting, healing, and growing. Let&apos;s:</p>
            <ul className={styles.checklist}>
              <li>✔ <strong>Understand each other</strong> – Share stories, not stereotypes.</li>
              <li>✔ <strong>Work together</strong> – Build something greater than ourselves.</li>
              <li>✔ <strong>Tell the truth</strong> – Speak openly, listen deeply.</li>
              <li>✔ <strong>Celebrate life</strong> – Because joy is resistance.</li>
            </ul>
            
            <div className={styles.importantInfo}>
              <p>📍 <strong>First Edition – Launching 2025!</strong></p>
              <p>This is only the beginning. Harmony Fest will return every year, bigger and bolder, but the mission stays the same: unity through culture.</p>
              
              <div className={styles.ctaBox}>
                <p>🎟️ <strong>Tickets selling fast!</strong> [Insert Link]</p>
                <p>🏨 <strong>Hotels booked separately</strong> – Plan your stay early!</p>
              </div>
              
              <p className={styles.closingText}>Come hungry. Leave full—in your belly, your heart, and your soul. Let&apos;s make history together. ❤️🔥</p>
            </div>
            
            <p><strong>
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
              Come Hungry, Leave Full—In Every Way!</strong><br />
            Whether you&apos;re a foodie, a music lover, or just someone who believes in good vibes, International Harmony Fest is your place to feast, dance, and connect. Fill our hearts as much as our plates!</p>
            
            <p>📍 <strong>Where & When:</strong> [Location + Date]<br />
            🎟️ <strong>Bracelets:</strong> [Link] (Early birds get extra treats!)</p>
            
            <p>See you there—ready to eat, dance, and spread the love! ✨</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.formHeadline}>Stay Updated</h2>
          <p className={styles.formSubheadline}>Join our mailing list for the latest news and updates</p>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter your name"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter your email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message (Optional):</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.inputField} ${styles.textareaField}`}
              placeholder="Type your message here..."
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
              I agree to receive email updates from International Harmony Fest. I understand that I can unsubscribe at any time by clicking the link in the footer of our emails. View our{' '}
              <a href="/privacy-policy" className={styles.privacyLink} target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitButton}>
              Subscribe
            </button>
          </div>
        </form>
      </main>
      
      <footer className={footerStyles.footer}>
        <div className={footerStyles.footerContent}>
          <div className={footerStyles.footerSection}>
            <h3>About Us</h3>
            <p>Celebrating food, music, and unity from around the world.</p>
          </div>
          <div className={footerStyles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Lineup</a></li>
              <li><a href="mailto:ulffestival2025@gmail.com?subject=Union of Love Festival / Linyon Lanmou Festival">Contact</a></li>
            </ul>
          </div>
          <div className={footerStyles.footerSection}>
            <h3>Contact Us</h3>
            <p>Email: info@harmonyfest.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className={footerStyles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} International Harmony Fest. All rights reserved.</p>
        </div>
      </footer>
        </div>
      </div>
    </div>
  );
}
