"use client";
import Link from 'next/link';

export default function VolunteerPage() {

  return (
    <main className="min-h-screen bg-brand-4">
      {/* Hero Section */}
      <section className="relative bg-brand-1 -mt-1 min-h-[60vh] flex items-center justify-center overflow-hidden">
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
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-brand-4 mb-6">
                  Volunteer
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-brand-4 mb-6">
                  Your time and talents are valuable to our community. Discover opportunities to serve and make a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#opportunities"
                    className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg"
                  >
                    Volunteer Opportunities
                  </Link>
                  <a
                    href="mailto:volunteer@graceontheashley.org"
                    className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg"
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
      <section id="opportunities" className="min-h-screen flex items-center py-16 bg-brand-1">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-brand-4 mb-8">
              Volunteer Opportunities
            </h2>

            <div className="max-w-4xl mx-auto mt-12">
              {/* Volunteer Sections */}
              <div className="space-y-12">
                {/* Sunday Service Roles */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Sunday Service Roles</h3>
                  <p className="text-brand-4 mb-6">
                    Serve during our worship services as greeters, ushers, children&apos;s ministry helpers, worship team members, or tech/AV support. Your presence helps create a welcoming atmosphere for our congregation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Greeters & Ushers</h4>
                      <p className="text-sm text-brand-4 mb-4">Welcome visitors and help with seating during services.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Learn More
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Tech & AV Support</h4>
                      <p className="text-sm text-brand-4 mb-4">Help with sound, lighting, and presentation during services.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Get Involved
                      </button>
                    </div>
                  </div>
                </div>

                {/* Children's Ministry */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Children&apos;s Ministry</h3>
                  <p className="text-brand-4 mb-6">
                    Work with our kids during Sunday school and services. Help teach Bible lessons, lead activities, and provide a safe, nurturing environment where children can learn about God&apos;s love.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Sunday School Teachers</h4>
                      <p className="text-sm text-brand-4 mb-4">Lead age-appropriate Bible lessons and activities.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Teach Sunday School
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Nursery Helpers</h4>
                      <p className="text-sm text-brand-4 mb-4">Care for our youngest members during services.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Help in Nursery
                      </button>
                    </div>
                  </div>
                </div>

                {/* Community Outreach */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Community Outreach</h3>
                  <p className="text-brand-4 mb-6">
                    Join us in serving our local community through food pantry programs, community events, neighborhood outreach, and support for those in need. Make a difference in Charleston and beyond.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Food Pantry</h4>
                      <p className="text-sm text-brand-4 mb-4">Help distribute food and supplies to families in need.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Volunteer at Pantry
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Community Events</h4>
                      <p className="text-sm text-brand-4 mb-4">Help organize and run community service events.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Join Events Team
                      </button>
                    </div>
                  </div>
                </div>

                {/* Youth Programs */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Youth Programs</h3>
                  <p className="text-brand-4 mb-6">
                    Mentor and guide our teenagers through various activities, Bible studies, and events. Help shape the next generation of believers and provide positive role models.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Youth Leaders</h4>
                      <p className="text-sm text-brand-4 mb-4">Lead Bible studies and activities for teenagers.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Lead Youth Group
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Event Coordinators</h4>
                      <p className="text-sm text-brand-4 mb-4">Help plan and execute youth events and retreats.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Coordinate Events
                      </button>
                    </div>
                  </div>
                </div>

                {/* Missions Support */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Missions Support</h3>
                  <p className="text-brand-4 mb-6">
                    Assist with mission trip planning, fundraising, prayer support, and logistics. Help us partner with missionaries and support global outreach efforts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Trip Planning</h4>
                      <p className="text-sm text-brand-4 mb-4">Help organize and coordinate mission trips.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Plan Missions
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Prayer Support</h4>
                      <p className="text-sm text-brand-4 mb-4 mb-4">Pray for missionaries and global outreach.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Join Prayer Team
                      </button>
                    </div>
                  </div>
                </div>

                {/* Administrative Support */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Administrative Support</h3>
                  <p className="text-brand-4 mb-6">
                    Use your organizational skills to help with office tasks, event planning, communication, and other behind-the-scenes ministry support roles.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Office Support</h4>
                      <p className="text-sm text-brand-4 mb-4">Help with administrative tasks and organization.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Office Volunteer
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-white">
                      <h4 className="font-light text-brand-4 mb-3">Event Planning</h4>
                      <p className="text-sm text-brand-4 mb-4">Assist with planning and coordinating church events.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Plan Events
                      </button>
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