"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function MinistriesPage() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? [] : [index]
    );
  };

  const ministriesItems = [
    {
      question: "Children's Ministry",
      answer: "Nurturing young hearts with God's love through age-appropriate teaching and activities designed to help children grow in their faith and understanding of Scripture."
    },
    {
      question: "Student Ministry",
      answer: "Equipping the next generation with biblical truth and life skills for their journey. We provide a safe space for teenagers to explore their faith, build friendships, and discover God's purpose for their lives."
    },
    {
      question: "Care Ministry",
      answer: "Supporting our community through prayer, encouragement, and practical help during times of need. Our care team is here to walk alongside members through life's challenges and celebrations."
    },
    {
      question: "Men's Ministry",
      answer: "Building godly men through fellowship, accountability, and service. We gather for Bible study, prayer, and activities that strengthen brotherhood and spiritual growth."
    },
    {
      question: "Women's Ministry",
      answer: "Encouraging women to grow in their relationship with Christ and each other. Through Bible studies, prayer groups, and fellowship events, we create opportunities for spiritual and personal development."
    },
    {
      question: "Married Couples Ministry",
      answer: "Strengthening marriages through biblical teaching and community support. We provide resources, counseling, and events to help couples grow closer to each other and to God."
    },
    {
      question: "Missions Ministry",
      answer: "Partnering with missionaries and supporting global outreach efforts to spread the Gospel worldwide. We are committed to being a sending church that invests in kingdom work both locally and internationally."
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
            alt="Community ministries background"
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
                  Ministries
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Discover the various ministries and groups at Grace on the Ashley where you can grow in faith and serve others.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#ministries"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Our Ministries
                  </Link>
                  <Link
                    href="/volunteer"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section id="ministries" className="min-h-screen flex items-center py-16" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Our Ministries
            </h2>
            


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
              {/* Ministries FAQ Section */}
              <div className="space-y-6 h-[700px] overflow-hidden lg:border-r lg:border-gray-300 lg:pr-8">
                {ministriesItems.map((item, index) => (
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}