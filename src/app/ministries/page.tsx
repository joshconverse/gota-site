import Link from 'next/link';

export default function MinistriesPage() {
  return (
    <main className="min-h-screen bg-brand-4">
      <div className="container mx-auto max-w-4xl px-6 md:px-12 lg:px-20 py-16">
        <h1 className="text-4xl md:text-5xl font-light text-black mb-8">Ministries</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">
            Discover the various ministries and groups at Grace on the Ashley where you can grow in faith and serve others.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Children</h2>
              <p className="text-gray-600 mb-4">
                Nurturing young hearts with God&apos;s love through age-appropriate teaching and activities.
              </p>
              <Link href="/children" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Students</h2>
              <p className="text-gray-600 mb-4">
                Equipping the next generation with biblical truth and life skills for their journey.
              </p>
              <Link href="/students" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Care Ministry</h2>
              <p className="text-gray-600 mb-4">
                Supporting our community through prayer, encouragement, and practical help during times of need.
              </p>
              <Link href="/care" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Men&apos;s Ministry</h2>
              <p className="text-gray-600 mb-4">
                Building godly men through fellowship, accountability, and service.
              </p>
              <Link href="/men" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Women&apos;s Ministry</h2>
              <p className="text-gray-600 mb-4">
                Encouraging women to grow in their relationship with Christ and each other.
              </p>
              <Link href="/women" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Married Couples</h2>
              <p className="text-gray-600 mb-4">
                Strengthening marriages through biblical teaching and community support.
              </p>
              <Link href="/married" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
              <h2 className="text-2xl font-semibold text-black mb-4">Missions</h2>
              <p className="text-gray-600 mb-4">
                Partnering with missionaries and supporting global outreach efforts to spread the Gospel worldwide.
              </p>
              <Link href="/missions" className="text-brand-1 hover:underline">Learn more →</Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}