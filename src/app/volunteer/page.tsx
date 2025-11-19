import Link from 'next/link';

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-brand-4">
      <div className="container mx-auto max-w-4xl px-6 md:px-12 lg:px-20 py-16">
        <h1 className="text-4xl md:text-5xl font-light text-black mb-8">Volunteer With Us</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">
            Your time and talents are valuable to our community. Discover opportunities to serve and make a difference.
          </p>

          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4">Why Volunteer?</h2>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Use your God-given gifts to serve others</li>
              <li>• Build meaningful relationships with fellow believers</li>
              <li>• Grow in your faith through hands-on ministry</li>
              <li>• Make a lasting impact in our community</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-black mb-4">Sunday Services</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Greeters & Ushers</li>
                <li>• Children&apos;s Ministry</li>
                <li>• Worship Team</li>
                <li>• Tech & AV Support</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-black mb-4">Community Outreach</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Food Pantry</li>
                <li>• Community Events</li>
                <li>• Mission Trips</li>
                <li>• Youth Programs</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Ready to get involved? Contact us to learn more about volunteer opportunities.
            </p>
            <div className="space-x-4">
              <a
                href="mailto:volunteer@graceontheashley.org"
                className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
              >
                Contact Us
              </a>
              <Link
                href="/"
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}