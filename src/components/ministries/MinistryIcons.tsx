type IconProps = {
  className?: string;
};

function ChildrenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8.5" cy="7.5" r="2.5" />
      <path d="M4.5 20v-1.2a4 4 0 0 1 8 0V20" />
      <circle cx="16.5" cy="9" r="2" />
      <path d="M13.5 20v-1a3.2 3.2 0 0 1 6.4 0v1" />
    </svg>
  );
}

function StudentsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 8v6" />
    </svg>
  );
}

function FaithPracticeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 6.5c-2-1.6-5-2-8-1v13c3-1 6-.6 8 1 2-1.6 5-2 8-1V5.5c-3-1-6-.6-8 1Z" />
      <path d="M12 6.5V19.5" />
    </svg>
  );
}

function CommunityGroupsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20v-1a5.5 5.5 0 0 1 9.5-3.7" />
      <path d="M16 4.3a3.2 3.2 0 0 1 0 6.2" />
      <path d="M15 14.5A5.5 5.5 0 0 1 21 20v0" />
    </svg>
  );
}

function MarriedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="13" r="5.5" />
      <circle cx="15" cy="13" r="5.5" />
    </svg>
  );
}

function LocalMissionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20.2s-7.2-4.4-9.4-8.6C1 8.2 3.4 4.8 6.8 4.8c2 0 3.5 1 5.2 3 1.7-2 3.2-3 5.2-3 3.4 0 5.8 3.4 4.2 6.8-2.2 4.2-9.4 8.6-9.4 8.6Z" />
    </svg>
  );
}

function WorshipIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

function InternationalMissionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9" />
      <path d="M12 3c-2.6 2.4-4 5.6-4 9s1.4 6.6 4 9" />
    </svg>
  );
}

const ICONS = {
  children: ChildrenIcon,
  students: StudentsIcon,
  'faith-and-practice': FaithPracticeIcon,
  'community-groups': CommunityGroupsIcon,
  married: MarriedIcon,
  'local-missions': LocalMissionsIcon,
  worship: WorshipIcon,
  'international-missions': InternationalMissionsIcon,
} as const;

export type MinistryIconId = keyof typeof ICONS;

export function MinistryIcon({ id, className }: { id: MinistryIconId; className?: string }) {
  const Icon = ICONS[id];
  return <Icon className={className} />;
}
