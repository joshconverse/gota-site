"use client";
import { useEffect, useState } from "react";

type RandomHeroImageProps = {
  /** Pool of image src paths to choose from. */
  pool: string[];
  alt: string;
  className?: string;
};

// Resting opacity of the hero background (matches the `opacity-20` tint treatment).
const HERO_OPACITY = 0.2;

/**
 * Renders a hero background <img> that picks one random image from `pool` per
 * page load. Nothing is rendered on the server (the parent's tinted background
 * shows through), so there's no initial image to swap out. On mount we choose a
 * single image and fade it in once it has loaded — no flash, no replacement.
 */
export default function RandomHeroImage({ pool, alt, className }: RandomHeroImageProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrc(pool[Math.floor(Math.random() * pool.length)]);
  }, [pool]);

  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{ opacity: loaded ? HERO_OPACITY : 0, transition: "opacity 700ms ease-in-out" }}
    />
  );
}
