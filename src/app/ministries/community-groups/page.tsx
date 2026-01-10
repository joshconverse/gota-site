import Link from 'next/link';

export default function CommunityGroupsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Community Groups background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                Community Groups
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                Small groups that meet regularly for fellowship, Bible study, prayer, and mutual support. Community Groups provide a place to grow deeper in faith and build meaningful relationships.
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

      {/* Content Section - Placeholder */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              More Information Coming Soon
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We&apos;re currently building out this page. Check back soon for more details about our Community Groups programs, schedules, and how to get involved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}