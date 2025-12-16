"use client";
import Image from "next/image";
import type { SanityDocument } from "next-sanity";
import HeroImage from "./HeroImage";
import { useState, useEffect } from "react";

export default function Hero({ doc, thumbnailUrl, streamTitle, streamUrl }: { 
  doc: SanityDocument | null; 
  thumbnailUrl?: string | null;
  streamTitle?: string | null;
  streamUrl?: string | null;
}) {
  const [showYouTubeData, setShowYouTubeData] = useState(false);

  useEffect(() => {
    // Wait a moment before showing YouTube data for smooth transition
    const timer = setTimeout(() => setShowYouTubeData(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Display values with transition
  const displayTitle = showYouTubeData ? (streamTitle || "2 Timothy 3:16-17 Part 2") : "Welcome";
  const displayLabel = showYouTubeData ? "Latest Sermon" : "Welcome to";

  return (
  <section className="relative min-h-screen md:min-h-[100svh] flex items-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-32 after:bg-brand-1 after:block sm:after:hidden">
      {/* Full-bleed background image (mirrored) */}
      <Image
        src="/pexels-enrique-12172754.jpg"
        alt="Church community gathering"
        fill
        priority
        className="object-cover -scale-x-100"
        sizes="100vw"
      />
      {/* Bright washout overlay - adjust for mobile */}
      <div className="absolute inset-0 bottom-0 md:bottom-[60px] bg-white/90" />

      {/* Content container */}
      <div className="relative z-10 container mx-auto max-w-[1440px] p-6 md:px-12 lg:px-20 w-full">
        <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Mobile: Only "Latest Sermon" label above video */}
          <div className="order-1 lg:hidden text-center mb-4">
            <p className={`text-xs uppercase tracking-wide text-slate-600 mb-0 leading-none transition-opacity duration-500 ${showYouTubeData ? 'opacity-100' : 'opacity-0'}`}>{displayLabel}</p>
          </div>

          {/* Right column: overlaid image panel with YouTube thumbnail or placeholder */}
          <div
            className="relative w-full order-2 lg:order-2 rounded-2xl border border-white/80 shadow-lg overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
          >
            <HeroImage thumbnailUrl={thumbnailUrl} streamTitle={streamTitle} />
            {/* Subtle gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

            {/* Centered play button linking to stream */}
            <a
              href={streamUrl || "https://www.youtube.com/watch?v=uMTiRg7Kcfo"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play stream on YouTube"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg ring-1 ring-white/70 transition hover:bg-white hover:scale-105"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>

          {/* Left column: Desktop sermon text (hidden on mobile) + Mobile title and button below video */}
          <div className="mt-4 lg:mt-16 order-3 lg:order-1 text-center lg:text-right">
            {/* Desktop: Full sermon info */}
            <div className="hidden lg:block">
              <p className={`text-xs sm:text-sm uppercase tracking-wide text-slate-600 mb-0 leading-none transition-opacity duration-500 ${showYouTubeData ? 'opacity-100' : 'opacity-0'}`}>{displayLabel}</p>
              <h1 className={`-mt-1 text-2xl sm:text-3xl font-semibold leading-tight text-slate-900 transition-opacity duration-500 ${showYouTubeData ? 'opacity-100' : 'opacity-0'}`}>{displayTitle}</h1>
            </div>
            {/* Mobile: Only title (no "Latest Sermon" label since it's above) */}
            <div className="lg:hidden">
              <h1 className={`!text-sm md:text-3xl font-semibold leading-tight text-slate-900 mb-4 transition-opacity duration-500 ${showYouTubeData ? 'opacity-100' : 'opacity-0'}`}>{displayTitle}</h1>
            </div>
            {/* Button for both mobile and desktop */}
            <div className="mt-4 mb-24 lg:mb-0 text-center lg:text-right">
              <a
                href={streamUrl || "https://www.youtube.com/watch?v=uMTiRg7Kcfo"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-2 text-slate-900 px-5 py-2.5 rounded-md font-semibold shadow hover:opacity-95"
              >
                Watch the stream
              </a>
            </div>
          </div>
        </div>
        {/* Social icons within teaser alignment: will sit 10px above the green bar */}
      </div>
      {/* Tease next section: show heading at the very bottom of the hero */}

      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center bg-brand-1 py-4 sm:py-2 rounded-t-[32px]">
        <div className="container relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 text-brand-4">
          {/* Social icons positioned 30px above the green bar - hidden on mobile */}
          <div className="hidden md:flex absolute -top-[45px] left-6 md:left-12 lg:left-20 z-10 items-center gap-3 text-black">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center hover:opacity-80"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 7.2a3.3 3.3 0 0 0-2.3-2.3C19.5 4.4 12 4.4 12 4.4s-7.5 0-9.2.5A3.3 3.3 0 0 0 .5 7.2 34.5 34.5 0 0 0 0 12a34.5 34.5 0 0 0 .5 4.8 3.3 3.3 0 0 0 2.3 2.3c1.7.5 9.2.5 9.2.5s7.5 0 9.2-.5a3.3 3.3 0 0 0 2.3-2.3A34.5 34.5 0 0 0 24 12a34.5 34.5 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center hover:opacity-80"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.92h-2.34V22C18.34 21.21 22 17.08 22 12.06Z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center hover:opacity-80"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
              </svg>
            </a>
          </div>
          <h1 className="font-semibold text-center" style={{ fontSize: 'clamp(3.5rem, 7vw, 3rem)' }}>Gather with us</h1>
        </div>
      </div>
    </section>
  );
}
