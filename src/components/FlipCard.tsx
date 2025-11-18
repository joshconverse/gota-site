'use client';

interface FlipCardProps {
  title: string;
  content: string;
}

export default function FlipCard({ title, content }: FlipCardProps) {
  return (
    <div
      className="group h-64 [perspective:1000px] cursor-pointer md:cursor-default"
      onClick={(e) => e.currentTarget.classList.toggle('flipped')}
    >
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-[.flipped]:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 border-2 border-brand-1 bg-brand-1 rounded-lg [backface-visibility:hidden]">
          <div className="relative flex items-center justify-center h-full">
            <h3 className="text-2xl md:text-3xl font-light text-brand-4">{title}</h3>
            {/* Arrow hint - bottom right corner */}
            <svg className="absolute bottom-4 right-4 text-brand-4" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
            </svg>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center border-2 border-brand-1 bg-brand-1 rounded-lg p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-brand-4 leading-relaxed text-center">{content}</p>
        </div>
      </div>
    </div>
  );
}
