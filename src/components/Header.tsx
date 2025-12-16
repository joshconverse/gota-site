"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function Header() {
  const [open, setOpen] = useState(false);


  return (
    <header className="fixed inset-x-0 top-4 z-50 h-0 pointer-events-none">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-3 md:p-4 flex items-center gap-4 md:h-[70px] md:py-0">
          <div className="flex-1">
            <Link href="/" className="inline-block leading-none">
              <span className="sr-only">Grace on the Ashley</span>
              {/* Use the cropped SVG wrapper so the logo is sharp and properly cropped */}
              <img src="/gota-logo-line.svg" alt="GOTA logo" className="block h-7 md:h-9 w-auto" />
            </Link>
            <div className="text-sm text-slate-500"></div>
          </div>

          {/* right side: nav + actions grouped so nav sits close to the Give button */}
          <div className="flex items-center gap-8">
            <nav className="nav-desktop">
              <ul className="flex justify-end gap-6 text-sm text-slate-700">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/visit">Visit</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/ministries">Ministries</Link></li>
                <li><Link href="/resources">Resources</Link></li>
                <li><Link href="/connect">Connect</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><a href="https://gotachurch.churchcenteronline.com/giving?open-in-church-center-modal=true" target="_blank" rel="noopener noreferrer">Give</a></li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">

              {/* hamburger */}
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="nav-hamburger p-2 rounded-md text-slate-700"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <MobileNav isOpen={open} onClose={() => setOpen(false)} />
      )}
    </header>
  );
}
