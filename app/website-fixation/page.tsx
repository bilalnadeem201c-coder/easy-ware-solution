import type { Metadata } from 'next';
import WebsiteFixationClient from './WebsiteFixationClient';

const BASE_URL = 'https://easywhere-solutions.com';

export const metadata: Metadata = {
  title: 'Website Fixation Services — Speed, Bugs, Security & Redesign',
  description: 'Professional website fixation services: speed optimization, bug fixing, security hardening, mobile responsiveness, redesign, and platform migration. Free audit included.',
  alternates: { canonical: `${BASE_URL}/website-fixation` },
  openGraph: {
    title: 'Website Fixation | EasyWhere Solutions',
    description: 'We fix slow, broken, and outdated websites fast. Speed optimization, bug fixes, security, mobile responsiveness and full redesigns.',
    url: `${BASE_URL}/website-fixation`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EasyWhere Solutions Website Fixation' }],
  },
};

export default function WebsiteFixationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Website Fixation',
            provider: { '@type': 'Organization', name: 'EasyWhere Solutions', url: BASE_URL },
            description: 'Professional website fixation: speed, bugs, security, mobile fixes, redesign, and migration.',
            url: `${BASE_URL}/website-fixation`,
            serviceType: ['Website Speed Optimization', 'Bug Fixing', 'Website Redesign', 'Security & Maintenance', 'Mobile Responsiveness', 'Platform Migration'],
          }),
        }}
      />
      <WebsiteFixationClient />
    </>
  );
}