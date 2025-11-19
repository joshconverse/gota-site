"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function VisitPage() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? [] : [index]
    );
  };

  const faqItems = [
    {
      question: "Faithful Preaching and Teaching",
      answer: "We believe in the clarity of Scripture and its application to the life of God's people. As such, we are committed to line-by-line expositional preaching through books of the Bible during our Sunday morning gathering."
    },
    {
      question: "Gospel-Centered Worship",
      answer: "The glory of God is paramount in our worship experience. We want to be a church that points people towards God by way of hymns and contemporary songs of rich theology, enjoyed by all generations."
    },
    {
      question: "Community",
      answer: "The Christian faith is made for relationship. We are called to live out our faith with others. At Grace on the Ashley, you will be welcomed into the family with warm Charleston hospitality."
    }
  ];
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Worship background"
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
                  <Link
                    href="#welcome"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    What to Expect
                  </Link>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2025+BEES+FERRY+ROAD+CHARLESTON+SC+29414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Get Directions
                  </a>
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
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              What to Expect
            </h2>
            
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              We invite you to worship with us this Sunday. If you have any questions or needs while you're with us, stop by our Welcome Center. We'd love to meet you!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
              {/* FAQ Section */}
              <div className="space-y-6 h-[700px] overflow-hidden">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors group"
                    >
                      <h3 className="text-lg font-semibold text-black pr-4 group-hover:text-brand-1 transition-colors">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-4 flex items-center justify-center">
                        <span className={`text-brand-1 font-bold text-lg transition-transform duration-200 ${openItems.includes(index) ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-8 pb-6">
                        <p className="text-gray-600 leading-relaxed text-left">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image Section */}
              <div className="hidden lg:block lg:sticky lg:top-32">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden aspect-[3/4]">
                  <img
                    src="/mature2.jpg"
                    alt="Worship at Grace on the Ashley"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}