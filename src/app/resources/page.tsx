import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-brand-4">
      <div className="container mx-auto max-w-4xl px-6 md:px-12 lg:px-20 py-16">
        <h1 className="text-4xl md:text-5xl font-light text-black mb-8">Resources</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">
            Access helpful resources to grow in your faith and understanding of God&apos;s Word.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Bible Study</h2>
              <p className="text-gray-600 mb-4">
                Study guides, devotionals, and tools to help you dive deeper into Scripture.
              </p>
              <a href="#" className="text-brand-1 hover:underline">Browse Bible Studies →</a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Sermons</h2>
              <p className="text-gray-600 mb-4">
                Listen to recent messages and teachings from our pastor and guest speakers.
              </p>
              <a href="#" className="text-brand-1 hover:underline">Listen to Sermons →</a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Prayer Requests</h2>
              <p className="text-gray-600 mb-4">
                Submit prayer requests or view our community prayer list.
              </p>
              <a href="#" className="text-brand-1 hover:underline">Submit Prayer Request →</a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-black mb-4">Giving</h2>
              <p className="text-gray-600 mb-4">
                Support the ministry through online giving and learn about stewardship.
              </p>
              <Link href="/give" className="text-brand-1 hover:underline">Give Online →</Link>
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