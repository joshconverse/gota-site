"use client";
import Link from 'next/link';

export default function MinistriesPage() {
  const ministries = [
    {
      id: "children",
      title: "Children's Ministry",
      description: "Nurturing young hearts with God's love through age-appropriate teaching and activities designed to help children grow in their faith and understanding of Scripture.",
      bgColor: "bg-brand-4"
    },
    {
      id: "students",
      title: "Student Ministry",
      description: "Equipping the next generation with biblical truth and life skills for their journey. We provide a safe space for teenagers to explore their faith, build friendships, and discover God's purpose for their lives.",
      bgColor: "bg-brand-1"
    },
    {
      id: "care",
      title: "Care Ministry",
      description: "Supporting our community through prayer, encouragement, and practical help during times of need. Our care team is here to walk alongside members through life's challenges and celebrations.",
      bgColor: "bg-brand-4"
    },
    {
      id: "men",
      title: "Men's Ministry",
      description: "Building godly men through fellowship, accountability, and service. We gather for Bible study, prayer, and activities that strengthen brotherhood and spiritual growth.",
      bgColor: "bg-brand-1"
    },
    {
      id: "women",
      title: "Women's Ministry",
      description: "Encouraging women to grow in their relationship with Christ and each other. Through Bible studies, prayer groups, and fellowship events, we create opportunities for spiritual and personal development.",
      bgColor: "bg-brand-4"
    },
    {
      id: "married",
      title: "Married Couples Ministry",
      description: "Strengthening marriages through biblical teaching and community support. We provide resources, counseling, and events to help couples grow closer to each other and to God.",
      bgColor: "bg-brand-1"
    },
    {
      id: "missions",
      title: "Missions Ministry",
      description: "Partnering with missionaries and supporting global outreach efforts to spread the Gospel worldwide. We are committed to being a sending church that invests in kingdom work both locally and internationally.",
      bgColor: "bg-brand-4"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[70vh] flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
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
                    href="#children"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Our Ministries
                  </Link>
                  <Link
                    href="/connect"
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

      {/* Ministries Sections */}
      {ministries.map((ministry, index) => (
        <section
          key={ministry.id}
          id={ministry.id}
          className={`min-h-screen flex items-center justify-center ${ministry.bgColor}`}
        >
          <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
                {ministry.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                {ministry.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/connect"
                  className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
                >
                  Get Involved
                </Link>
                {index < ministries.length - 1 && (
                  <Link
                    href={`#${ministries[index + 1].id}`}
                    className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition border border-gray-300"
                  >
                    Next Ministry
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}