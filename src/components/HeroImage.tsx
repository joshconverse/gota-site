'use client';

import { useState, useEffect } from 'react';

interface HeroImageProps {
  thumbnailUrl: string | null | undefined;
  streamTitle?: string | null;
}

export default function HeroImage({ thumbnailUrl, streamTitle }: HeroImageProps) {
  // imageUrl is the external thumbnail to show when available
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // isVisible controls the opacity for cross-fade (image visibility)
  // start false so placeholder is visible initially
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    // No thumbnail: show placeholder
    if (!thumbnailUrl) {
      // Avoid calling setState synchronously inside the effect body; schedule
      // an update on the next animation frame so lint/React are happy.
      requestAnimationFrame(() => {
        if (!mounted) return;
        setImageUrl(null);
        setIsVisible(true);
      });
      return () => {
        mounted = false;
      };
    }

    const img = new Image();
    img.onload = () => {
      if (!mounted) return;
      // Put the image URL into state (adds <img> to DOM), then
      // on the next animation frame trigger visibility to fade it in.
      setImageUrl(thumbnailUrl as string);
      requestAnimationFrame(() => {
        if (!mounted) return;
        requestAnimationFrame(() => setIsVisible(true));
      });
    };
    img.onerror = () => {
      if (!mounted) return;
      setImageUrl(null);
      setIsVisible(true);
    };
    img.src = `${thumbnailUrl}?t=${Date.now()}`;

    return () => {
      mounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [thumbnailUrl]);

  // Render both placeholder and (when ready) the external thumbnail so
  // we can cross-fade between them.
  return (
    <>
      {/* Placeholder underneath */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-b from-brand-3 to-brand-1 flex items-center justify-center transition-opacity duration-500 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center text-white px-4">
          <div className="text-lg font-semibold">Welcome</div>
        </div>
      </div>

      {/* External thumbnail on top (only rendered when imageUrl is set) */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={streamTitle || 'Latest service from Grace on the Ashley'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </>
  );
}