'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroImageProps {
  thumbnailUrl: string | null | undefined;
  streamTitle?: string | null;
}

export default function HeroImage({ thumbnailUrl, streamTitle }: HeroImageProps) {
  const [imageSrc, setImageSrc] = useState('/imagecap.png');

  useEffect(() => {
    // If there's a thumbnail URL, test whether it loads and only update
    // state from the async load/error handlers. Avoid calling setState
    // synchronously inside the effect body to prevent cascading renders.
    if (!thumbnailUrl) return;

    console.log('Testing YouTube thumbnail for hero:', thumbnailUrl);
    const img = document.createElement('img');
    let mounted = true;

    img.onload = () => {
      if (!mounted) return;
      console.log('YouTube thumbnail loaded successfully for hero');
      setImageSrc(thumbnailUrl);
    };

    img.onerror = () => {
      if (!mounted) return;
      console.log('YouTube thumbnail failed to load for hero, using fallback');
      setImageSrc('/imagecap.png');
    };

    img.src = `${thumbnailUrl}?t=${Date.now()}`; // Add cache-busting parameter for testing

    return () => {
      mounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [thumbnailUrl]);

  // Use Next.js Image for local images, regular img for external URLs
  if (imageSrc.startsWith('/')) {
    return (
      <Image
        src={imageSrc}
        alt={streamTitle || "Latest service from Grace on the Ashley"}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    );
  } else {
    return (
      <img
        src={imageSrc}
        alt={streamTitle || "Latest service from Grace on the Ashley"}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
}