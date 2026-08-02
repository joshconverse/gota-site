import type { PCGroup } from '@/utils/planningcenterGroups';

// Public Church Center domain (…churchcenter.com). Note: …churchcenteronline.com
// is the admin/login portal and must NOT be used for visitor-facing links.
const CHURCH_CENTER_GROUPS_URL = 'https://gotachurch.churchcenter.com/groups';

/**
 * Church Center links open in a modal on the site when the
 * `js.churchcenter.com/modal/v1` script is loaded (it is, site-wide via
 * layout.tsx) and the URL carries `open-in-church-center-modal=true`.
 */
function withModal(url: string) {
  return url.includes('?')
    ? `${url}&open-in-church-center-modal=true`
    : `${url}?open-in-church-center-modal=true`;
}

export default function GroupsGrid({ groups }: { groups: PCGroup[] }) {
  // No groups available (empty list, or Planning Center not reachable / not
  // configured) — point people to the full listing in Church Center instead.
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
      {groups.map((group) => (
        <div key={group.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
          <h3 className="text-xl font-semibold text-black mb-2">{group.name}</h3>
          {group.schedule && (
            <p className="text-sm font-semibold text-brand-1 mb-3">{group.schedule}</p>
          )}
          {group.description && (
            <p className="text-gray-700 leading-relaxed mb-6 flex-1">{group.description}</p>
          )}
          <a
            href={group.link ? withModal(group.link) : CHURCH_CENTER_GROUPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block text-center bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
          >
            Join this group
          </a>
        </div>
      ))}
    </div>
  );
}
