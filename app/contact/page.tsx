import type { Metadata } from 'next';
import ContactClient from './ContactClient';

const BASE_URL = 'https://easywhere-solutions.com';

export const metadata: Metadata = {
  title: 'Contact Us — Book a Free Strategy Call',
  description: 'Get in touch with EasyWhere Solutions. Book a free 30-minute strategy call and receive a custom digital marketing proposal within 48 hours. We reply within 24 hours.',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact EasyWhere Solutions — Free Strategy Call',
    description: 'Book a free 30-minute strategy call and receive a custom digital marketing proposal within 48 hours.',
    url: `${BASE_URL}/contact`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact EasyWhere Solutions' }],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact EasyWhere Solutions',
  description: 'Get in touch with our digital marketing experts for a free strategy consultation.',
  url: `${BASE_URL}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'EasyWhere Solutions',
    telephone: '+1-555-000-1234',
    email: 'hello@easywhere.com',
    address: { '@type': 'PostalAddress', streetAddress: '123 Digital Avenue', addressLocality: 'New York', addressRegion: 'NY', postalCode: '10001', addressCountry: 'US' },
    openingHours: 'Mo-Fr 09:00-18:00',
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <ContactClient />
    </>
  );
}
