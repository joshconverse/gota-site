import Image from 'next/image';

// Static background for the Mission section. Previously this autoplayed a
// 66 MB 4K MP4 from /public, which downloaded on every visit and was the
// dominant driver of Vercel Fast Data Transfer. This still is a frame pulled
// from that same steeple flyover (mission-steeple.jpg, ~98 KB), rendered
// blurred at 30% opacity — visually equivalent to the video at a fraction of
// the egress.
export default function MissionBackground() {
  return (
    <Image
      src="/mission-steeple.jpg"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
      className="absolute inset-0 w-full h-full object-cover opacity-30"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}
