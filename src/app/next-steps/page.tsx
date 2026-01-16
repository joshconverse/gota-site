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

      {/* Gospel Section */}
      <section id="salvation" className="min-h-screen flex items-center justify-center bg-brand-4 py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              What is the Gospel?
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The word "gospel" means "good news."  As Christians, we believe it takes the whole Bible to tell the story of the gospel, but to put it simply, the good news is that Jesus is the Son of God who died on the cross to pay for the sins of the world.
              </p>
              <p>
                Ever since the day Adam and Eve disobeyed God in the garden, humans have suffered under the curse that God warned our sin deserved, but God waited until it was the perfect time to send His Son from heaven to earth to rescue us.  Jesus was our only hope.
              </p>
              <p>
                He lived the perfect life that we couldn't live and taught us how to love God and love other people.  At the end of his time on earth, he submitted himself to dying the death that we should have died.  The truth is, when Jesus died on a Roman cross, it wasn't an execution.  It was a purposeful sacrifice by which Jesus bore the penalty of all our sins.  God was so merciful to us.
              </p>
              <p>
                Three days later, Jesus rose from the dead, just as the Bible had predicted hundreds and thousands of years before.  This is the greatest news of all because, not only did Jesus die in our place, he also made it possible to grant us eternal life by the power of his own resurrection.
              </p>
              <p>
                There was no way we could do enough good works to earn salvation, but Jesus saved us because he loves us.  This act of undeserved salvation is what we call grace – a gift we don't deserve, but God grants it to us anyways.
              </p>
              <p>
                So if you're wondering how to be saved, the only way is to put your faith and trust in Jesus and what he did to save us, including you.  When we have faith in Jesus, we make it our aim in life to honor him.  We trust that Jesus's death and resurrection was enough to save us, and we respond by living in the way he commands us -- by turning away from our sins when we recognize we've failed.
              </p>
              <p>
                Being a Christian is the same thing as being a disciple of Jesus.  We follow him, trust in his forgiveness, and turn from sin.  In short, we make Jesus our Lord.  Consider putting your faith in him today.
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
        </div>
      </section>

      {/* Baptism Section */}
      <section className="min-h-screen flex items-center justify-center bg-white py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
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
      </section>

      {/* Membership Section */}
      <section id="membership" className="min-h-screen flex items-center justify-center bg-brand-4 py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
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
