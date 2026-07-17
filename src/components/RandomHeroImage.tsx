"use client";
import { useEffect, useState } from "react";

type RandomHeroImageProps = {
  /** Pool of image src paths to choose from. */
  pool: string[];
  alt: string;
  className?: string;
};

/**
 * Renders a hero background <img> that picks a random image from `pool` on each
 * page load. Because pages are statically prerendered, the first server-rendered
 * frame uses pool[0]; on mount we swap to a random pick. The image sits behind a
 * tint at low opacity, so the swap is imperceptible.
 */
export default function RandomHeroImage({ pool, alt, className }: RandomHeroImageProps) {
  const [src, setSrc] = useState(pool[0]);

  useEffect(() => {
    setSrc(pool[Math.floor(Math.random() * pool.length)]);
  }, [pool]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
