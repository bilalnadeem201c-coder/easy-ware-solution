
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import MarqueeTicker from '@/components/home/MarqueeTicker';
import Testimonials from '@/components/home/Testimonials';
import HomeCTA from '@/components/home/HomeCTA';
import BeforeAfterShowcase from '@/components/home/BeforeAfterShowcase';
import ScrollRevealSection from '@/components/ScrollRevealSection';

const BASE_URL = 'https://easywhere-solutions.com';

export const metadata: Metadata = {
  title: 'Digital Marketing Agency — Grow Your Brand',
  description: 'EasyWhere Solutions is a premium digital marketing agency that helps brands grow through SEO, PPC, social media marketing, content strategy, and data-driven campaigns. 500+ clients served.',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'EasyWhere Solutions — Digital Marketing Agency',
    description: 'Premium digital marketing agency driving measurable growth through SEO, PPC, social media, and content strategy.',
    url: BASE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EasyWhere Solutions — We Grow Brands Beyond Limits' }],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'EasyWhere Solutions — Digital Marketing Agency',
  description: 'Premium digital marketing agency helping brands grow through SEO, PPC, social media, and data-driven strategies.',
  url: BASE_URL,
  breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL }] },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HeroSection />
<ScrollRevealSection />
<BeforeAfterShowcase />
<ServicesPreview />
<MarqueeTicker />
<Testimonials />
<HomeCTA />
    </>
  );
}
