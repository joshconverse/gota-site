"use client";
import Link from "next/link";
import { IconBrandYoutube, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { ChevronRightIcon } from "lucide-react";

const menuItems = [
  { link: '/', text: 'Home' },
  { link: '/about', text: 'About' },
  { link: '/watch', text: 'Watch' },
  { link: '/ministries', text: 'Ministries' },
  { link: '/next-steps', text: 'Next Steps' },
]


type MobileNavProps = {
  onClose?: () => void;
};

export default function MobileNav({ onClose }: MobileNavProps) {
  return (

    <aside className="flex flex-col w-full bg-white ">
      <nav className="flex-1 overflow-y-auto p-6 flex flex-col">
        <ul className="flex flex-col">
          {menuItems.map(({ link, text }) => (
            <li key={link}>
              <Item size="sm" asChild>
                <Link href={link} onClick={onClose} className="text-lg text-black px-4 py-3 block hover:bg-slate-100 rounded-md transition-colors">
                  <ItemContent>
                    <ItemTitle className="text-lg">{text}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon className="size-4" />
                  </ItemActions>
                </Link>
              </Item>
            </li>
          ))}
        </ul>

        {/* Social Links at bottom of nav area, left justified */}
        <div className="flex items-center gap-4 pt-2">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex h-10 w-10 items-center justify-center !text-black"
          >
            <IconBrandYoutube width="22" height="22" aria-hidden="true" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center !text-black"
          >
            <IconBrandFacebook width="22" height="22" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center !text-black"
          >
            <IconBrandInstagram width="22" height="22" aria-hidden="true" />
          </a>
        </div>
      </nav>

      <div className="border-t p-6">
        <a href="https://gotachurch.churchcenteronline.com/giving?open-in-church-center-modal=true" target="_blank" rel="noopener noreferrer" className="block rounded-md bg-brand-2 px-4 py-2 text-center text-slate-900">
          Give
        </a>
      </div>
    </aside >
  );
}



