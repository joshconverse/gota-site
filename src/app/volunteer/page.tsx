"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function VolunteerPage() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? [] : [index]
    );
  };

  const volunteerItems = [
    {
      question: "Sunday Service Roles",
      answer: "Serve during our worship services as greeters, ushers, children's ministry helpers, worship team members, or tech/AV support. Your presence helps create a welcoming atmosphere for our congregation."
    },
    {
      question: "Children's Ministry",
      answer: "Work with our kids during Sunday school and services. Help teach Bible lessons, lead activities, and provide a safe, nurturing environment where children can learn about God's love."
    },
    {
      question: "Community Outreach",
      answer: "Join us in serving our local community through food pantry programs, community events, neighborhood outreach, and support for those in need. Make a difference in Charleston and beyond."
    },
    {
      question: "Youth Programs",
      answer: "Mentor and guide our teenagers through various activities, Bible studies, and events. Help shape the next generation of believers and provide positive role models."
    },
    {
      question: "Missions Support",
      answer: "Assist with mission trip planning, fundraising, prayer support, and logistics. Help us partner with missionaries and support global outreach efforts."
    },
    {
      question: "Administrative Support",
      answer: "Use your organizational skills to help with office tasks, event planning, communication, and other behind-the-scenes ministry support roles."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/MATURE2.jpg"
            alt="Community service background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  Volunteer
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Your time and talents are valuable to our community. Discover opportunities to serve and make a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#opportunities"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Volunteer Opportunities
                  </Link>
                  <a
                    href="mailto:volunteer@graceontheashley.org"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="opportunities" className="min-h-screen flex items-center py-16" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Volunteer Opportunities
            </h2>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
              {/* Volunteer FAQ Section */}
              <div className="space-y-6 h-[700px] overflow-hidden lg:border-r lg:border-gray-300 lg:pr-8">
                {volunteerItems.map((item, index) => (
                  <div key={index} className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-0 py-6 text-left flex justify-between items-center transition-colors group"
                    >
                      <h3 className="text-xl font-light text-black pr-4 transition-colors">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-4 flex items-center justify-center">
                        <svg
                          className={`w-6 h-6 text-brand-1 transition-transform duration-200 ${openItems.includes(index) ? 'rotate-180' : ''}`}
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.5303 20.8839C16.2374 21.1768 15.7626 21.1768 15.4697 20.8839L7.82318 13.2374C7.53029 12.9445 7.53029 12.4697 7.82318 12.1768L8.17674 11.8232C8.46963 11.5303 8.9445 11.5303 9.2374 11.8232L16 18.5858L22.7626 11.8232C23.0555 11.5303 23.5303 11.5303 23.8232 11.8232L24.1768 12.1768C24.4697 12.4697 24.4697 12.9445 24.1768 13.2374L16.5303 20.8839Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-0 pb-6">
                        <p className="text-gray-600 leading-relaxed text-left">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission Section */}
              <div className="hidden lg:block">
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-light text-black mb-6">
                      We exist to make, mature<br />
                      and multiply disciples of Jesus
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">Why Volunteer?</h4>
                      <ul className="text-gray-600 leading-relaxed text-left space-y-2">
                        <li>• Use your God-given gifts to serve others</li>
                        <li>• Build meaningful relationships with fellow believers</li>
                        <li>• Grow in your faith through hands-on ministry</li>
                        <li>• Make a lasting impact in our community</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">Ready to Get Involved?</h4>
                      <p className="text-gray-600 leading-relaxed text-left mb-4">
                        Contact us to learn more about volunteer opportunities that match your skills and interests.
                      </p>
                      <a
                        href="mailto:volunteer@graceontheashley.org"
                        className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}