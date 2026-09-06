import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-14">
            <Link href="/admin" className="text-sm font-bold text-slate-900">
              Admin
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/admin/sources" className="text-sm text-slate-600 hover:text-emerald-600">
                Sources
              </Link>
              <Link href="/admin/inbox" className="text-sm text-slate-600 hover:text-emerald-600">
                Inbox
              </Link>
              <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
                Back to Site
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
