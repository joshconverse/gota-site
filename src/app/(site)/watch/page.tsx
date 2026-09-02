import type { Metadata } from 'next';
import { OG_IMAGES } from '@/lib/seo';
import WatchContent from './WatchContent';

export const metadata: Metadata = {
  title: 'Sermons',
  description:
    "Watch and listen to sermons from Grace on the Ashley. Browse our sermon library to grow in your faith and understanding of God's Word.",
  alternates: { canonical: '/watch' },
  openGraph: {
    title: 'Sermons | Grace on the Ashley',
    description:
      "Watch and listen to sermons from Grace on the Ashley — grow in your faith and understanding of God's Word.",
    url: '/watch',
    images: OG_IMAGES,
  },
};

export default function WatchPage() {
  return <WatchContent />;
}
