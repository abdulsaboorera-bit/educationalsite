import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getAllBoardSlugs, getBoardBySlug } from "@/lib/matric/boards";

export function generateStaticParams() {
  return getAllBoardSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) return {};
  return {
    title: `${board.short_name} Result 2025 - Check by Roll Number | PakEdu`,
    description: `Check ${board.short_name} Matric result 2025. Enter your roll number to see your result, marks, grade, and position.`,
    alternates: { canonical: `https://pakedu.pk/matric/results/${board.slug}` },
  };
}

export default async function BoardResultPage({ params }: Props) {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Results", href: "/matric/results" },
              { label: board.short_name },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {board.short_name} Result 2025
          </h1>
          <p className="text-emerald-100 mt-2">{board.name}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Check Your Result
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your roll number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Select Class
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                    <option value="10">Class 10 (SSC Part II)</option>
                    <option value="9">Class 9 (SSC Part I)</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                  Check Result
                </button>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                <p className="font-semibold mb-1">Note:</p>
                <p>
                  This is a preview interface. The actual result lookup will be connected
                  once the Education Data Engine populates result data for {board.short_name}.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Board Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Full Name</dt>
                  <dd className="font-medium text-slate-900 text-right">{board.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Website</dt>
                  <dd className="font-medium text-slate-900">
                    <a
                      href={board.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      Visit Official Site
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">Other Boards</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {getAllBoardSlugs()
                    .filter((s) => s !== board.slug)
                    .slice(0, 10)
                    .map((s) => {
                      const b = getBoardBySlug(s);
                      return b ? (
                        <Link
                          key={s}
                          href={`/matric/results/${s}`}
                          className="block text-sm text-emerald-600 hover:underline"
                        >
                          {b.short_name}
                        </Link>
                      ) : null;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
