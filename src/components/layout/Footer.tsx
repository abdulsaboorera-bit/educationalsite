import Link from "next/link";
import { FOOTER_LINKS, SITE_CONFIG } from "@/config/site";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-sm">
                PE
              </div>
              <span className="text-xl font-bold">
                Pak<span className="text-emerald-400">Edu</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Pakistan&apos;s comprehensive education platform. Matric to University, everything you need.
            </p>
            <p className="text-xs text-slate-500">
              Built for students worldwide
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Matric</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.matric.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Calculators</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.calculators.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Universities</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.universities.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Tools & More</h4>
            <ul className="space-y-2">
              {[...FOOTER_LINKS.tools, ...FOOTER_LINKS.platform].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built for students worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
