"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Only render portal content after mount to avoid server/client markup mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !mounted) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const portalTarget = document.body;
    const previous = portalTarget.style.overflow;
    if (isOpen) {
      portalTarget.style.overflow = "hidden";
    }
    return () => {
      portalTarget.style.overflow = previous;
    };
  }, [isOpen, mounted]);

  if (!mounted) return null;

  const content = (
    <div aria-hidden={!isOpen} className={`fixed inset-0 z-[80] ${isOpen ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-80 flex-col bg-white shadow-xl transition-transform sm:w-96 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <div className="text-lg font-bold text-black">Menu</div>
          <button aria-label="Close menu" onClick={onClose} className="text-black">
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 flex flex-col">
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/" onClick={onClose} className="text-lg !text-black">
                Home
              </Link>
            </li>
            <li>
              <Link href="/visit" onClick={onClose} className="text-lg !text-black">
                Visit
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={onClose} className="text-lg !text-black">
                About
              </Link>
            </li>
            <li>
              <Link href="/ministries" onClick={onClose} className="text-lg !text-black">
                Ministries
              </Link>
            </li>
            <li>
              <Link href="/resources" onClick={onClose} className="text-lg !text-black">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/connect" onClick={onClose} className="text-lg !text-black">
                Connect
              </Link>
            </li>
            <li>
              <Link href="/events" onClick={onClose} className="text-lg !text-black">
                Events
              </Link>
            </li>
          </ul>
          
          {/* Spacer to push social links to bottom */}
          <div className="flex-1"></div>
          
          {/* Social Links at bottom of nav area, left justified */}
          <div className="flex items-center gap-4 pb-12">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center !text-black"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 7.2a3.3 3.3 0 0 0-2.3-2.3C19.5 4.4 12 4.4 12 4.4s-7.5 0-9.2.5A3.3 3.3 0 0 0 .5 7.2 34.5 34.5 0 0 0 0 12a34.5 34.5 0 0 0 .5 4.8 3.3 3.3 0 0 0 2.3 2.3c1.7.5 9.2.5 9.2.5s7.5 0 9.2-.5a3.3 3.3 0 0 0 2.3-2.3A34.5 34.5 0 0 0 24 12a34.5 34.5 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center !text-black"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.92h-2.34V22C18.34 21.21 22 17.08 22 12.06Z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center !text-black"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
              </svg>
            </a>
          </div>
        </nav>

        <div className="border-t p-6">
          <a href="https://gotachurch.churchcenteronline.com/giving?open-in-church-center-modal=true" target="_blank" rel="noopener noreferrer" className="block rounded-md bg-brand-2 px-4 py-2 text-center text-slate-900">
            Give
          </a>
        </div>
      </aside>
    </div>
  );

  return createPortal(content, document.body);
}
