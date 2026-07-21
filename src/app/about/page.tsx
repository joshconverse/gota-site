import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/seo';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn what Grace on the Ashley believes, meet our elders, pastors, and staff, and discover our mission to make, mature, and mobilize disciples of Jesus in Charleston, SC.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Grace on the Ashley',
    description:
      'What we believe and who we are — the beliefs, leadership, and mission of Grace on the Ashley, a Baptist church in Charleston, SC.',
    url: '/about',
    images: OG_IMAGES,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
