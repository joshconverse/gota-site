export default function Footer() {
  return (
    <footer className="bg-brand-3">
  <div className="container mx-auto max-w-[1440px] p-6 md:px-12 lg:px-20 text-sm flex flex-col md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0 text-slate-900">© {new Date().getFullYear()} Grace on the Ashley</div>
        <div className="flex gap-4">
          <a href="/privacy" className="text-black md:text-slate-900 hover:underline">Privacy</a>
          <a href="/terms" className="text-black md:text-slate-900 hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}
