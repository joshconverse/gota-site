"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { BadgeCheckIcon, ChevronRightIcon, Menu, X } from "lucide-react";
import { Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from "./ui/item";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleOpen = () => {
    setShouldRender(true);
    // Small delay to ensure DOM is ready before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
      });
    });
  };

  const handleClose = () => {
    setOpen(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => setShouldRender(false), 300);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 h-0 pointer-events-none">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="pointer-events-auto bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-3 md:p-4 flex items-center gap-4 md:h-[70px] md:py-0">
          <div className="flex flex-1 items-center">
            <Link href="/" className="inline-block leading-none">
              <span className="sr-only">Grace on the Ashley</span>
              {/* Use the cropped SVG wrapper so the logo is sharp and properly cropped */}
              <Image width={196} height={24} src="/gota-logo-line.svg" alt="GOTA logo" className="block h-7 md:h-9 w-auto" />
            </Link>
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
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                  <button
                    aria-label={open ? "Close menu" : "Open menu"}
                    className="nav-hamburger p-2 rounded-md text-slate-700"
                  >
                    {open ? (
                      <X width="24" height="24" aria-hidden="true" />
                    ) : (
                      <Menu width="24" height="24" aria-hidden="true" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="fixed rounded-2xl shadow-lg inset-x-0 top-0 mt-20 z-40 w-full max-w-[1440px] mx-auto overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                  <MobileNav onClose={() => setOpen(false)} />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
