import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-3">
      <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Main Links */}
          <div className="space-y-2">
            <Link href="/resources#resources" className="block text-slate-900 hover:text-brand-1 transition-colors">Watch</Link>
            <Link href="/visit" className="block text-slate-900 hover:text-brand-1 transition-colors">Visit</Link>
            <Link href="/about" className="block text-slate-900 hover:text-brand-1 transition-colors">About</Link>
            <Link href="/resources" className="block text-slate-900 hover:text-brand-1 transition-colors">Resources</Link>
            <Link href="/volunteer" className="block text-slate-900 hover:text-brand-1 transition-colors">Volunteer</Link>
            <Link href="/events" className="block text-slate-900 hover:text-brand-1 transition-colors">Events</Link>
          </div>

          {/* Ministries */}
          <div className="space-y-2">
            <Link href="/ministries#children" className="block text-slate-900 hover:text-brand-1 transition-colors">Children</Link>
            <Link href="/ministries#students" className="block text-slate-900 hover:text-brand-1 transition-colors">Students</Link>
            <Link href="/ministries#care" className="block text-slate-900 hover:text-brand-1 transition-colors">Care</Link>
            <Link href="/ministries#men" className="block text-slate-900 hover:text-brand-1 transition-colors">Men</Link>
            <Link href="/ministries#women" className="block text-slate-900 hover:text-brand-1 transition-colors">Women</Link>
            <Link href="/ministries#married" className="block text-slate-900 hover:text-brand-1 transition-colors">Married</Link>
            <Link href="/ministries#missions" className="block text-slate-900 hover:text-brand-1 transition-colors">Missions</Link>
          </div>
        </div>

        {/* Logo and Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-8 border-t border-slate-300">
          <Link href="/" className="inline-block">
            <Image
              src="/gota-logo-line.svg"
              alt="Grace on the Ashley"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} Grace on the Ashley
          </div>
        </div>
      </div>
    </footer>
  );
}
