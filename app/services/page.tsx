import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

const BASE_URL = 'https://easywhere-solutions.com';

export const metadata: Metadata = {
  title: 'Digital Marketing Services — SEO, PPC, Social Media & More',
  description: 'Explore our full suite of digital marketing services: SEO, PPC advertising, social media management, content marketing, email automation, analytics, e-commerce marketing, and video production.',
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    title: 'Digital Marketing Services | EasyWhere Solutions',
    description: 'Full-service digital marketing: SEO, PPC, social media, content strategy, email marketing and more.',
    url: `${BASE_URL}/services`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EasyWhere Solutions Services' }],
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'EasyWhere Solutions Digital Marketing Services',
  description: 'Full suite of digital marketing services',
  url: `${BASE_URL}/services`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SEO & Organic Growth', description: 'Technical SEO, content authority, and link-building ecosystems.' },
    { '@type': 'ListItem', position: 2, name: 'Social Media Marketing', description: 'Platform-specific strategies that build genuine audiences.' },
    { '@type': 'ListItem', position: 3, name: 'PPC & Paid Advertising', description: 'Precision-targeted campaigns engineered for maximum ROI.' },
    { '@type': 'ListItem', position: 4, name: 'Analytics & Data Intelligence', description: 'Comprehensive measurement frameworks and attribution models.' },
    { '@type': 'ListItem', position: 5, name: 'Content Marketing', description: 'Strategic content production that educates, engages, and converts.' },
    { '@type': 'ListItem', position: 6, name: 'Email & Marketing Automation', description: 'Intelligent automation that nurtures leads through every funnel stage.' },
    { '@type': 'ListItem', position: 7, name: 'E-Commerce Marketing', description: 'End-to-end e-commerce growth strategies.' },
    { '@type': 'ListItem', position: 8, name: 'Video & Creative Production', description: 'Cinematic brand storytelling that stops the scroll.' },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <ServicesClient />
    </>
  );
}
