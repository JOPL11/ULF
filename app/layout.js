import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Pattaya } from "next/font/google";
import CookieBanner from "./components/CookieBanner";

const pattaya = Pattaya({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pattaya',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: "Union of Love Festival",
  description: "International Cuisine, Music & People Festival / Haiti 2025",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang || 'en'} className={`${inter.variable} ${pattaya.variable}`}>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
