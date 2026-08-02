import type { CityGroup } from '@/lib/cityGroups';

// Public Church Center domain (…churchcenter.com). Note: …churchcenteronline.com
// is the admin/login portal and must NOT be used for visitor-facing links.
//
// We link directly to each group's Church Center page (opened in a new tab)
// rather than using the `open-in-church-center-modal=true` in-page modal: that
// modal is intended for giving/registration flows and just shows an endless
// loading spinner for a group page (notably in Edge on Windows).
const CHURCH_CENTER_GROUPS_URL = 'https://gotachurch.churchcenter.com/groups/community-groups';

const BADGE_COLORS = ['bg-brand-1', 'bg-brand-2'];

// Small "neighborhood / homes" mark echoing the City Groups theme.
function GroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11.5 8 7l5 4.5" />
      <path d="M4.5 10.8V19h7v-8.2" />
      <path d="M13 19h7v-7.5l-4-3.4-3 2.6" />
      <path d="M7.5 19v-3.5h2.5V19" />
    </svg>
  );
}

const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function GroupsGrid({ groups }: { groups: CityGroup[] }) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Browse our current groups in Church Center and request to join in a couple taps.
        </p>
        <a
          href={CHURCH_CENTER_GROUPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
        >
          Browse Groups in Church Center
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {groups.map((group, i) => (
        <a
          key={group.url}
          href={group.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 border border-gray-100"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${BADGE_COLORS[i % BADGE_COLORS.length]}`}>
            <GroupIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-black mb-2 group-hover:text-brand-1 transition-colors">
            {group.name}
          </h3>
          {group.note && (
            <p className="text-sm font-semibold text-brand-1 mb-2">{group.note}</p>
          )}
          {group.meets && (
            <p className="text-sm text-gray-500 mb-3">{group.meets}</p>
          )}
          {group.description && (
            <p className="text-gray-600 leading-relaxed text-base">{group.description}</p>
          )}
          <div className="mt-auto pt-6 flex items-center text-brand-1 font-semibold group-hover:translate-x-2 transition-transform">
            View group
            <ArrowIcon />
          </div>
        </a>
      ))}
    </div>
  );
}
