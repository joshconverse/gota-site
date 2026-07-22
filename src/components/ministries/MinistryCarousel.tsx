'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MinistryIcon, type MinistryIconId } from './MinistryIcons';

type Ministry = {
  id: MinistryIconId;
  title: string;
  description: string;
};

const BADGE_COLORS = ['bg-brand-1', 'bg-brand-2'];

export default function MinistryCarousel({ ministries }: { ministries: Ministry[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const max = Math.max(trackWidth - viewportWidth, 0);
      setMaxTranslate(max);
      setWrapperHeight(max + window.innerHeight);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [ministries.length]);

  useEffect(() => {
    function onScroll() {
      if (!wrapperRef.current || maxTranslate <= 0) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const p = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      setTranslateX(-p * maxTranslate);
      setProgress(p);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [maxTranslate]);

  return (
    <div ref={wrapperRef} style={wrapperHeight ? { height: wrapperHeight } : undefined} className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 md:px-12 lg:px-20 will-change-transform"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {ministries.map((ministry, i) => (
            <Link
              key={ministry.id}
              href={`/ministries/${ministry.id}`}
              className="group flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-10 border border-gray-100"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
              >
                <MinistryIcon id={ministry.id} className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium text-black mb-4 group-hover:text-brand-1 transition-colors">
                {ministry.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {ministry.description}
              </p>
              <div className="mt-8 flex items-center text-brand-1 font-semibold group-hover:translate-x-2 transition-transform">
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="self-center mt-10 w-48 h-1 rounded-full bg-black/10 overflow-hidden">
          <div
            className="h-full bg-brand-1 rounded-full"
            style={{ width: `${Math.max(progress * 100, ministries.length ? 100 / ministries.length : 0)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
