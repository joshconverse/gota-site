"use client";
import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "gota-cookie-notice-dismissed";
const CHANGE_EVENT = "gota-cookie-notice-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // localStorage unavailable (private mode / blocked) — treat as not dismissed.
    return false;
  }
}

// On the server we can't know if the visitor dismissed the notice, so render it
// as "dismissed" (nothing) during SSR. useSyncExternalStore reconciles to the
// real client value on hydration without a mismatch warning.
function getServerSnapshot() {
  return true;
}

export default function CookieBanner() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore write failures; worst case the notice reappears next visit.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 bg-brand-3 border-t border-slate-300 shadow-lg"
    >
      <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-2 flex flex-row items-center gap-3 sm:gap-4">
        <p className="text-xs text-slate-900 flex-1">
          We use cookies, including Google Analytics, to understand how visitors
          use our site. See our{" "}
          <Link href="/privacy" className="underline hover:text-brand-1 transition-colors">
            Privacy &amp; Cookies
          </Link>{" "}
          page to learn more.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 bg-brand-2 text-slate-900 text-sm px-4 py-1 rounded-md font-semibold shadow hover:opacity-95 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
