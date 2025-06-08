"use client";

import Image from 'next/image';

export default function StaticHero() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image
        src="/images/poster2.png"
        alt="Harmony Fest 2025"
        width={800}
        height={1200}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '800px',
          objectFit: 'contain'
        }}
        priority
      />
    </div>
  );
}
