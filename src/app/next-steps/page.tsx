"use client";
import Link from 'next/link';

export default function NextStepsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[70vh] flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/MATURE2.jpg"
            alt="Next steps background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left mt-12 md:mt-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  Next Steps
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Take your next steps in faith. Discover what it means to follow Jesus and find your place in His church.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#salvation"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Learn About Salvation
                  </Link>
                  <Link
                    href="#membership"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Church Membership
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salvation Section */}
      <section id="salvation" className="min-h-screen flex items-center justify-center bg-brand-4 py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
                What is Salvation?
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Salvation is a mystery. While acknowledging our finite and incomplete understanding of God's ways, in faith we believe that God calls us as sinners to repent and be saved by placing faith in the Lord Jesus Christ.
                </p>
                <p>
                  Those who respond to God's call in repentance and faith are justified by grace through faith in Christ alone. Salvation is the gracious purpose of God according to which He justifies, sanctifies, and glorifies sinners through the finished work of Jesus Christ on the cross.
                </p>
                <p>
                  Justification occurs by and through Christ and because of His work on the cross and is apprehended through faith. No one is justified partly by Christ and partly by works. Salvation is received by grace through faith, not by human merit or effort.
                </p>
                <p>
                  The grace of redemption is that by which God effectually calls His chosen, converting them to Himself, and quickening them from spiritual death to spiritual life. This grace is operative by and through God alone.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="#membership"
                  className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
                >
                  Next: Church Membership
                </Link>
              </div>
            </div>

            {/* Right Column: Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🕊️</div>
                  <p className="text-lg font-semibold">Salvation Image</p>
                  <p className="text-sm">Placeholder for salvation-related image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Baptism Section */}
      <section className="min-h-screen flex items-center justify-center bg-white py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image Placeholder */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">💧</div>
                  <p className="text-lg font-semibold">Baptism Image</p>
                  <p className="text-sm">Placeholder for baptism-related image</p>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
                Baptism: A Public Declaration
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Christian baptism is the immersion of a believer in water in the name of the Father, the Son, and the Holy Spirit. It is an act of outward obedience symbolizing the believer's faith in a crucified, buried, and risen Savior.
                </p>
                <p>
                  Baptism represents death to sin, burial of the old life, and resurrection to walk in newness of life in Christ Jesus. It is a testimony to a believer's faith in an ultimate bodily resurrection to eternal life with Christ in His Kingdom.
                </p>
                <p>
                  We practice believer's baptism by immersion, following the New Testament pattern. Baptism is a significant expression of salvation, worship, and submission to God for the believer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="min-h-screen flex items-center justify-center bg-brand-4 py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
                Church Membership
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Church membership is a commitment to walk together in faith. As a member, you join with other believers in covenant relationship, sharing in the responsibilities and joys of church life.
                </p>
                <p>
                  Membership involves regular attendance, financial support through giving, service to others, and accountability in spiritual growth. It's not about earning salvation, but about living out the faith we've received.
                </p>
                <p>
                  We believe in congregational governance, where members have a voice in church decisions. Our approach is Baptist in heritage - emphasizing believer's baptism, congregational polity, and the autonomy of the local church.
                </p>
                <p>
                  While we hold to Reformed theology in many areas, we remain non-denominational in practice, focusing on biblical faithfulness rather than institutional loyalty.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/ministries"
                  className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
                >
                  Explore Our Ministries
                </Link>
              </div>
            </div>

            {/* Right Column: Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">⛪</div>
                  <p className="text-lg font-semibold">Church Membership Image</p>
                  <p className="text-sm">Placeholder for membership-related image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Ready to Take Your Next Steps?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Whether you're exploring faith for the first time or looking to deepen your commitment, we're here to walk with you. Contact us to learn more about any of these next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@graceontheashley.org"
                className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
              >
                Contact Us
              </a>
              <Link
                href="/about"
                className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition border border-gray-300"
              >
                Learn About Our Beliefs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
