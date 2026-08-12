import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import PreloaderWrapper from '@/components/PreloaderWrapper';

const BASE_URL = 'https://easywhere-solutions.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'EasyWhere Solutions — Digital Marketing Agency',
    template: '%s | EasyWhere Solutions',
  },
  description: 'EasyWhere Solutions is a premium digital marketing agency helping brands grow through SEO, PPC, social media, content strategy, and data-driven marketing.',
  keywords: ['digital marketing agency', 'SEO agency', 'PPC management', 'social media marketing', 'content marketing', 'marketing automation', 'EasyWhere Solutions'],
  authors: [{ name: 'EasyWhere Solutions', url: BASE_URL }],
  creator: 'EasyWhere Solutions',
  publisher: 'EasyWhere Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'EasyWhere Solutions',
    title: 'EasyWhere Solutions — Digital Marketing Agency',
    description: 'Premium digital marketing agency driving growth through SEO, social media, PPC, and data-driven strategies.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EasyWhere Solutions — Digital Marketing Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyWhere Solutions — Digital Marketing Agency',
    description: 'Premium digital marketing agency driving growth through SEO, social media, PPC, and data-driven strategies.',
    images: ['/og-image.png'],
    creator: '@easywhere',
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  name: 'EasyWhere Solutions',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Premium digital marketing agency driving growth through SEO, social media, PPC, and data-driven strategies.',
  foundingDate: '2015',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Digital Avenue',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10001',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-000-1234',
    contactType: 'customer service',
    email: 'hello@easywhere.com',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.linkedin.com/company/easywhere-solutions',
    'https://twitter.com/easywhere',
    'https://www.instagram.com/easywhere',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <PreloaderWrapper />
        <CustomCursor />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}