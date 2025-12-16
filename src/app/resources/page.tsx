"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getYouTubePlaylists, YouTubePlaylist } from '@/utils/youtube';
import SermonLibrary from '@/components/SermonLibrary';

export default function ResourcesPage() {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? [] : [index]
    );
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoadingPlaylists(true);
      try {
        const fetchedPlaylists = await getYouTubePlaylists();
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, []);

  const resourcesItems = [
    {
      question: "Bible Study Resources",
      answer: "Access study guides, devotionals, and tools to help you dive deeper into Scripture. We provide resources for both individual study and group discussions to enrich your understanding of God's Word."
    },
    {
      question: "Sermon Library",
      answer: "sermon-library", // Special identifier for component rendering
      isSermonLibrary: true
    },
    {
      question: "Prayer Ministry",
      answer: "Submit prayer requests or view our community prayer list. Join us in lifting up our congregation, community, and world in prayer as we seek God's guidance and provision."
    },
    {
      question: "Online Giving",
      answer: "Support the ministry through secure online giving and learn about biblical stewardship. Your generous contributions help us continue our mission of making, maturing, and multiplying disciples."
    }
  ];

  return (
    <main className="min-h-screen bg-brand-4">
      {/* Hero Section */}
      <section className="relative bg-brand-1 -mt-1 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Resources and study background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-brand-4 mb-6">
                  Resources
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-brand-4 mb-6">
                  Access helpful resources to grow in your faith and understanding of God&apos;s Word.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#resources"
                    className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg"
                  >
                    Browse Resources
                  </Link>
                  <Link
                    href="/give"
                    className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg"
                  >
                    Give Online
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="min-h-screen flex items-center py-16 bg-brand-1">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-brand-4 mb-8">
              Resources
            </h2>



            <div className="max-w-4xl mx-auto mt-12">
              {/* Resources Sections */}
              <div className="space-y-12">
                {/* Sermon Library */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Sermon Library</h3>
                  <p className="text-brand-4 mb-6">
                    Access our complete collection of sermons and teachings. Browse by series or topic to find messages that speak to your current season of life.
                  </p>
                  <SermonLibrary playlists={playlists} />
                </div>

                {/* Bible Study Resources */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Bible Study Resources</h3>
                  <p className="text-brand-4 mb-6">
                    Deepen your understanding of Scripture with our Bible study guides, devotionals, and study tools designed for personal and group study.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-brand-4/20">
                      <h4 className="font-light text-brand-4 mb-3">Daily Devotionals</h4>
                      <p className="text-sm text-brand-4 mb-4">Start your day with guided readings and reflections.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        View Devotionals
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-brand-4/20">
                      <h4 className="font-light text-brand-4 mb-3">Study Guides</h4>
                      <p className="text-sm text-brand-4 mb-4">Comprehensive guides for book-by-book Bible study.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Download Guides
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prayer Ministry */}
                <div>
                  <h3 className="text-2xl font-light text-brand-4 mb-4">Prayer Ministry</h3>
                  <p className="text-brand-4 mb-6">
                    Join our prayer ministry for communal prayer times, prayer requests, and resources to strengthen your personal prayer life.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-brand-4/20">
                      <h4 className="font-light text-brand-4 mb-3">Prayer Requests</h4>
                      <p className="text-sm text-brand-4 mb-4">Submit prayer requests or join our prayer chain.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Submit Request
                      </button>
                    </div>
                    <div className="bg-brand-4/10 p-6 rounded-lg border border-brand-4/20">
                      <h4 className="font-light text-brand-4 mb-3">Prayer Groups</h4>
                      <p className="text-sm text-brand-4 mb-4">Connect with others for regular prayer meetings.</p>
                      <button className="w-full bg-brand-2 text-slate-900 px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity text-sm">
                        Find a Group
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