import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';

export default function ReEngageMinistryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={GENERAL_HERO_IMAGES}
            alt="Re | Engage background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                Re | Engage
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                Strengthening marriages through biblical teaching and community support. We provide resources, counseling, and events to help couples grow closer to each other and to God.
              </p>
              <Link
                href="/ministries"
                className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
              >
                Back to Ministries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              Re|Engage Marriage Ministry Begins August 23
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We&apos;re excited to announce that Re|Engage, GOTA&apos;s marriage enrichment ministry, begins Sunday, August 23, 2026 through the beginning of December, and will meet from 4:30&ndash;6:00 p.m.
            </p>
          </div>
        </div>
      </section>

      {/* When & Where */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            When &amp; Where
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-light text-black mb-2">Begins</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">Sunday, August 23, 2026</span>
              </p>
            </div>
            <div className="bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-light text-black mb-2">Runs Through</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">Early December</span>
              </p>
            </div>
            <div className="bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-light text-black mb-2">Sundays</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">4:30&ndash;6:00 p.m.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Re|Engage */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              About Re|Engage
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Re|Engage is a marriage ministry designed to bring couples together to discover God&apos;s design for marriage and apply biblical principles that help build, strengthen, and maintain healthy, Christ-centered relationships.
              </p>
              <p>
                Whether your marriage is thriving, needs encouragement, or is facing challenges, Re|Engage provides a safe, supportive environment where couples can grow together through biblical teaching and authentic community.
              </p>
              <p>
                To foster meaningful relationships and build trust within each group, enrollment will close once groups reach capacity. This allows participants to experience a consistent, comfortable environment where lasting connections can be formed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Sign Up
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              If you&apos;re interested in investing in your marriage, we encourage you to register early, as space is limited.
            </p>
            <a
              href="https://gotachurch.churchcenteronline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              Sign up in the Church Center App
            </a>
            <p className="text-sm text-gray-600 leading-relaxed mt-6">
              Childcare is provided.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
