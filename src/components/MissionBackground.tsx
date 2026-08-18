import Image from 'next/image';

// Static background for the Mission section. Previously this autoplayed a
// 66 MB 4K MP4 from /public, which downloaded on every visit and was the
// dominant driver of Vercel Fast Data Transfer. The background is rendered
// blurred at 30% opacity, so a small optimized still is visually equivalent
// at a fraction of the egress.
export default function MissionBackground() {
  return (
    <Image
      src="/WorshipEdited.jpg"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
      quality={60}
      className="absolute inset-0 w-full h-full object-cover opacity-30"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}
