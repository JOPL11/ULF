"use client";

import Image from 'next/image';
import styles from './StaticHero.module.css';

export default function StaticHero() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/poster2.png"
          alt="Union of Love Festival 2025"
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
