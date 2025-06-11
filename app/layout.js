import { Exo_2 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Pattaya } from "next/font/google";

const pattaya = Pattaya({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pattaya',
  display: 'swap',
});

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
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
    <html lang={params.lang || 'en'} className={`${exo2.variable} ${pattaya.variable}`}>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
