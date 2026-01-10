"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { YouTubePlaylist } from '@/utils/youtube';
import SermonLibrary from '@/components/SermonLibrary';

export default function WatchPage() {
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoadingPlaylists(true);
      try {
        const response = await fetch('/api/youtube/playlists');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to fetch playlists:', response.status, errorData);
          setPlaylists([]);
          return;
        }
        const data = await response.json();
        setPlaylists(data.playlists || []);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
        setPlaylists([]);
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <main className="min-h-screen bg-brand-4">
      {/* Hero Section */}
      <section className="relative bg-brand-1 -mt-1 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Sermons background"
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
                  Sermons
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-brand-4 mb-6">
                  Access helpful sermons to grow in your faith and understanding of God&apos;s Word.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#sermons"
                    className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg"
                  >
                    Browse Sermons
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
      <section id="sermons" className="min-h-screen flex items-center py-16 pt-32 scroll-mt-0 bg-brand-1">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-brand-4 mb-8">
              Sermons
            </h2>



            <div className="max-w-4xl mx-auto mt-12">
              {/* Sermons Sections */}
              <div className="space-y-12">
                {/* Sermon Library Component */}
                <div>
                  <SermonLibrary playlists={playlists} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}