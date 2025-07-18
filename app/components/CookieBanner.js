'use client';

import dynamic from 'next/dynamic';

// Dynamically import the CookieConsent component with SSR disabled
const CookieConsent = dynamic(
  () => import('./CookieConsent'),
  { ssr: false }
);

export default function CookieBanner() {
  return <CookieConsent />;
}
