'use client';
import Image from 'next/image';
import styles from './Sun.module.css';

const Sun = () => {
  return (
    <div className={styles.sunContainer}>
      <Image 
        src="/images/sun.svg" 
        alt="Sun" 
        width={900} 
        height={900}
        className={styles.sunImage}
        priority
      />
    </div>
  );
};

export default Sun;
