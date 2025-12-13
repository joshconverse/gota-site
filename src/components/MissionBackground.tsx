'use client';

export default function MissionBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-30"
      style={{ filter: 'blur(0.5px)' }}
    >
      <source src="/12579306_3840_2160_24fps.mp4" type="video/mp4" />
      {/* Fallback image if video doesn't load */}
      <img
        src="/WorshipEdited.jpg"
        alt="Worship background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        style={{ filter: 'blur(0.5px)' }}
      />
    </video>
  );
}