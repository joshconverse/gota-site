import type { Metadata } from 'next';
import RandomHeroImage from '@/components/RandomHeroImage';
import MinistryCarousel from '@/components/ministries/MinistryCarousel';
import type { MinistryIconId } from '@/components/ministries/MinistryIcons';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';
import { OG_IMAGES } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Ministries',
  description:
    'Explore the ministries of Grace on the Ashley — Grace Kids, Students, City Groups, Re | Engage marriage ministry, and local & international missions in Charleston, SC.',
  alternates: { canonical: '/ministries' },
  openGraph: {
    title: 'Ministries | Grace on the Ashley',
    description:
      'Grace Kids, Students, City Groups, Re | Engage, and missions — find your place to grow and serve at Grace on the Ashley.',
    url: '/ministries',
    images: OG_IMAGES,
  },
};

export default function MinistriesPage() {
  const ministries: { id: MinistryIconId; title: string; description: string }[] = [
    {
      id: "children",
      title: "Grace Kids",
      description: "We provide a safe, loving, Christ-centered environment for babies through 5th grade and help them learn about Jesus.",
    },
    {
      id: "students",
      title: "Student Ministry",
      description: "Inviting students to a life of faith in Jesus Christ",
    },
    {
      id: "faith-and-practice",
      title: "Faith & Practice",
      description: "A weekly Sunday school class where we grow together in the Christian faith and learn how to live it out.",
    },
    {
      id: "community-groups",
      title: "City Groups",
      description: "City Groups are the ideal place to build real relationships and the church's first point of contact for care. Meeting throughout the week, they're also where we invite friends and neighbors who don't yet know Christ into community.",
    },
    {
      id: "married",
      title: "Re | Engage",
      description: "Strengthening marriages through biblical teaching and community support. We provide resources, counseling, and events to help couples grow closer to each other and to God.",
    },
    {
      id: "local-missions",
      title: "Local Missions",
      description: "Sharing the love of Christ with our Lowcountry neighbors through service and partnerships that meet real needs — including CarePortal, which connects us with local children and families in crisis.",
    },
    {
      id: "international-missions",
      title: "International Missions",
      description: "Taking the Gospel to the nations by partnering with the International Mission Board (IMB) to send and support missionaries among the unreached peoples of the world.",
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={GENERAL_HERO_IMAGES}
            alt="Community ministries background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  Ministries
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Discover the various ministries and groups at Grace on the Ashley where you can grow in faith and serve others.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#children"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    View Ministries
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Carousel Section */}
      <section id="children" className="bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 pt-20">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-4 text-center">
            Our Ministries
          </h2>
          <p className="text-gray-600 text-center">
            Keep scrolling to explore where you can grow in faith and serve others.
          </p>
        </div>
        <MinistryCarousel ministries={ministries} />
      </section>
    </main>
  );
}