"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function VisitPage() {
  const [openAccordion, setOpenAccordion] = useState<number>(0);

  const accordionItems = [
    {
      title: "Preaching",
      sections: [
        {
          heading: "Faithful Preaching and Teaching",
          text: "We believe in the clarity of Scripture and its application to the life of God's people. As such, we are committed to line-by-line expositional preaching through books of the Bible during our Sunday morning gathering."
        },
        {
          heading: "Gospel-Centered Worship",
          text: "The glory of God is paramount in our worship experience. We want to be a church that points people towards God by way of hymns and contemporary songs of rich theology, enjoyed by all generations."
        },
        {
          heading: "Community",
          text: "The Christian faith is made for relationship. We are called to live out our faith with others. At Grace on the Ashley, you will be welcomed into the family with warm Charleston hospitality."
        }
      ]
    },
    {
      title: "Guest Parking",
      sections: [
        {
          heading: "",
          text: "We've reserved convenient parking spaces just for you! Look for our guest parking signs when you arrive, and you'll be greeted by our friendly parking team. They'll be happy to direct you to our Welcome Center or escort you directly to the Worship Service."
        }
      ]
    },
    {
      title: "Welcome Center",
      sections: [
        {
          heading: "",
          text: "Our Welcome Center is your first stop for a warm greeting and helpful guidance! Our dedicated Welcome Team is ready to assist you with Kids' Ministry check-in, direct you to classes, or guide you to the Worship Service. We're here to make your visit comfortable and welcoming!"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Worship background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left mt-8 md:mt-0">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  Visit Us
                </h1>
              </div>
              
              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  We would love to have you join us for worship and fellowship at Grace on the Ashley.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-white">
                  <h3 className="text-lg font-semibold mb-3">Service Times</h3>
                  <div className="space-y-1">
                    <p><strong>Sunday School:</strong> 9:30 AM</p>
                    <p><strong>Main Service:</strong> 10:45 AM</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2025+BEES+FERRY+ROAD+CHARLESTON+SC+29414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 flex items-center justify-center whitespace-nowrap truncate bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200 mb-8 md:mb-4 min-h-[56px]"
                  >
                    Directions
                  </a>
                  <Link
                    href="#welcome"
                    className="flex-1 min-w-0 flex items-center justify-center whitespace-nowrap truncate bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200 mb-8 md:mb-4 min-h-[56px]"
                  >
                    What to Expect
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      <section id="welcome" className="min-h-screen flex items-center py-16" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8 mt-8 md:mt-0">
              What to Expect
            </h2>
            


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
              {/* Mission Section */}
              <div className="hidden lg:block lg:border-r lg:border-gray-300 lg:pr-8">
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-light text-black mb-6">
                      We exist to make, mature<br />
                      and multiply disciples of Jesus
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">We make disciples</h4>
                      <p className="text-gray-600 leading-relaxed text-left">
                        At Grace, we aim to live as sent people for purposes of reaching those without the hope of the Gospel. The Great Commission is a central feature of our vision and mission as a local church.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">We mature disciples</h4>
                      <p className="text-gray-600 leading-relaxed text-left">
                        As a church, we believe in the importance of maturing disciples in their knowledge and practice of Scripture. We take seriously the truths of God&apos;s Word and aim to equip believers to vigorously live out a robust Christian faith.
                      </p>
                    </div>

                    <div className="col-span-2">
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">We mobilize disciples</h4>
                      <p className="text-gray-600 leading-relaxed text-left">
                        God has called the church to be kingdom-oriented. Therefore, at Grace, we aim to be a church that develops leaders, plants churches, and invests in God&apos;s larger kingdom purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Section */}
              <div className="space-y-4">
                {accordionItems.map((item, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === index ? -1 : index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-xl font-light text-black">
                        {item.title}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          openAccordion === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {openAccordion === index && (
                      <div className="px-6 pb-6 pt-2 bg-white">
                        <div className="space-y-4">
                          {item.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              {section.heading && (
                                <h4 className="text-lg font-semibold text-black mb-2">
                                  {section.heading}
                                </h4>
                              )}
                              <p className="text-gray-600 leading-relaxed">
                                {section.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}