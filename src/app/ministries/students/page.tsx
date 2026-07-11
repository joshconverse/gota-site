import Link from 'next/link';

export default function StudentsMinistryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-brand-1 to-brand-2">
        <div className="absolute inset-0 bg-black/30"></div>
        <img
          src="/WorshipEdited.jpg"
          alt="Student Ministry"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Student Ministry</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Inviting students to a life of faith in Jesus Christ
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              About Student Ministry
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Today&apos;s youth are tomorrow&apos;s church. At Grace, our goal is to disciple the next generation of believers toward confident faith in Christ. We prioritize teaching Scripture, gathering with the church, cultivating biblical literacy and a Christian worldview, and fostering meaningful friendships. We also like to have fun!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ages Served */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8 text-center">
              Ages Served
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <h3 className="text-2xl font-semibold text-brand-1 mb-2">Grades 6&ndash;12</h3>
              <p className="text-lg text-gray-700">Middle &amp; High School</p>
            </div>
          </div>
        </div>
      </section>

      {/* When We Meet */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
              When We Meet
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-brand-4 rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-brand-1 mb-4">Sundays</h3>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">9:30 am</span>
                </p>
              </div>
              <div className="bg-brand-4 rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-brand-1 mb-4">1st &amp; 3rd Wednesdays</h3>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>
                    <span className="font-semibold">5:30 pm</span> &mdash; Dinner
                  </li>
                  <li>
                    <span className="font-semibold">6:30 pm</span> &mdash; Discipleship &amp; Games
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Leaders */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              Ministry Leaders
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <p className="text-2xl font-semibold text-brand-1 mb-4">Ben &amp; Audrey Yadon</p>
              <a
                href="mailto:students@gotachurch.org"
                className="text-lg text-gray-700 hover:text-brand-1 transition"
              >
                students@gotachurch.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Get Involved
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Have a student in 6th&ndash;12th grade? We&apos;d love to meet you. Reach out to Ben &amp; Audrey or come by on a Sunday morning.
            </p>
            <Link
              href="/ministries"
              className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              Back to Ministries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
