'use client';

import { useState, useEffect } from 'react';

interface HeroImageProps {
  thumbnailUrl: string | null | undefined;
  streamTitle?: string | null;
}

export default function HeroImage({ thumbnailUrl, streamTitle }: HeroImageProps) {
  // imageUrl is the external thumbnail to show when available
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // isVisible controls the opacity for cross-fade
  const [isVisible, setIsVisible] = useState(true);

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
      // cross-fade from placeholder -> thumbnail
      setIsVisible(false);
      setTimeout(() => {
        if (!mounted) return;
        setImageUrl(thumbnailUrl as string);
        setIsVisible(true);
      }, 300);
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

  // If we have an external thumbnail, render it with a fade
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={streamTitle || 'Latest service from Grace on the Ashley'}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
    );
  }

  // Placeholder: simple colored panel (no static image file)
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-brand-3 to-brand-1 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <div className="text-lg font-semibold">Welcome</div>
      </div>
    </div>
  );
}