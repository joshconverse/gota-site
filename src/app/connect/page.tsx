"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function ConnectPage() {
  const connectGroups = [
    {
      id: "children",
      title: "Children",
      description: "The children's ministry (birth through 5th grade) at Grace on the Ashley is a fun and safe environment for children to learn about Jesus. Our primary goals are to support parents in their role of raising godly children and help our children understand and apply the gospel in their lives.",
      bgColor: "bg-brand-4"
    },
    {
      id: "students",
      title: "Students",
      description: "Our student ministry (6th-12th grade) equips students to live out a robust Christian faith through worship, teaching, and relationships. We're fully integrated into Sunday morning worship and provide unique weekly opportunities for students to gather and grow.<br />",
      bgColor: "bg-brand-1"
    },
    {
      id: "city-groups",
      title: "City Groups",
      description: "Community is central to the ministry of Grace on the Ashley. We offer a wide variety of opportunities to gather in community in addition to Sunday morning worship. From City Groups, which are our missional communities, to more traditional gatherings, we value relationships and fellowship.",
      bgColor: "bg-brand-4"
    }
  ];

  const [checkInExpanded, setCheckInExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/MATURE2.jpg"
            alt="Community connection background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left mt-12 md:mt-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  Connect
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Your time and talents are valuable to our community. Discover opportunities to serve and make a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#children"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Our Groups
                  </Link>
                  <a
                    href="mailto:connect@graceontheashley.org"
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

      {/* Connect Group Sections */}
      {connectGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className={`min-h-screen flex items-center justify-center ${group.bgColor} ${group.id === 'students' ? 'pb-16' : ''}`}
        >
          <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-light text-black mb-8 pt-22 md:pt-12">
                {group.title}
              </h2>
              {group.id === 'students' ? (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-left" dangerouslySetInnerHTML={{ __html: group.description }} />
              ) : group.id === 'city-groups' ? (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-left">
                  {group.description}
                </p>
              ) : group.id === 'children' ? (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-left">
                  {group.description}
                </p>
              ) : null}
              {group.id === 'children' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">Security</h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-left">
                      Your child&apos;s safety is our top priority. We use the By The Book Roll Call Check-In System for secure drop-off and pick-up.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4 text-left">
                      All volunteers undergo thorough background screenings (federal/state/county criminal history and sexual offender database checks) plus extensive children&apos;s safety training.
                    </p>
                    <button
                      onClick={() => setCheckInExpanded(!checkInExpanded)}
                      className="bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-300 text-sm"
                    >
                      {checkInExpanded ? 'Hide' : 'View'} Check-In Process
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${checkInExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <div className="text-gray-700 leading-relaxed text-left">
                        <ul className="list-disc list-inside space-y-1 text-left">
                          <li>Collect parent names, phone numbers, addresses, allergies, and emergency contacts</li>
                          <li>Provide printed name tags with unique identification numbers</li>
                          <li>Parents must present ID number for pick-up</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">Directions</h3>
                    <p className="text-gray-700 leading-relaxed text-left">
                      From the Welcome Center, turn right into the children&apos;s hallway (across from the church gym). Rooms are clearly marked by age group.
                    </p>
                  </div>

                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">Children&apos;s Events</h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-left">
                      Join us for Vacation Bible School, harvest festivals, back-to-school events, parent&apos;s night out, and more throughout the year.
                    </p>
                    <button className="bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition text-left">
                      Sign Up for Newsletter
                    </button>
                  </div>
                </div>
              )}

              {group.id === 'students' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">Sunday Gatherings</h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-left">
                      Every Sunday morning at 9:30 AM, students gather for in-depth Bible study and teaching. We have an excellent rotation of teachers uniquely prepared to equip students with Scripture.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-left">
                      Join us in the student ministry area for worship, fellowship, and spiritual growth.
                    </p>
                  </div>

                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">Open Gym Night</h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-left">
                      On the last Sunday of each month from 6-8 PM, we host Open Gym Night at the church gym. Pizza and drinks are served for a fun evening of games and fellowship.
                    </p>
                    <button className="bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition text-left mb-6 md:mb-4">
                      Get Connected
                    </button>
                  </div>
                </div>
              )}

              {group.id === 'city-groups' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">What are City Groups?</h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-left">
                      City Groups are our missional communities where we gather for fellowship, prayer, Bible study, and service. These small groups help us build deeper relationships and live out our faith together.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-left">
                      Groups meet throughout Charleston in homes and other locations for authentic community and spiritual growth.
                    </p>
                  </div>

                  <div className="text-left border border-white p-6 rounded-lg">
                    <h3 className="text-2xl font-light text-black mb-3">How to Join</h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-left">
                      Connect with us to find a City Group that fits your schedule and location. We have groups meeting at various times throughout the week.
                    </p>
                    <button className="bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition text-left">
                      Find a Group
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                {index < connectGroups.length - 1 && (
                  <Link
                    href={`#${connectGroups[index + 1].id}`}
                    className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition border border-gray-300"
                  >
                    {connectGroups[index + 1].title}
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
