import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: `${board.short_name} Date Sheet 2025 - Matric Exam Schedule | PakEdu`,
    description: `Check ${board.short_name} Matric date sheet 2025. Download exam schedule for Class 9 and Class 10.`,
    alternates: { canonical: `https://pakedu.pk/matric/date-sheets/${board.slug}` },
  };
}

export default async function BoardDateSheetPage({ params }: Props) {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) notFound();

  const sampleSchedule = [
    { date: "March 10, 2025", day: "Monday", subject: "English (Compulsory)", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 11, 2025", day: "Tuesday", subject: "Urdu (Compulsory)", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 12, 2025", day: "Wednesday", subject: "Mathematics", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 13, 2025", day: "Thursday", subject: "Physics", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 14, 2025", day: "Friday", subject: "Chemistry", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 15, 2025", day: "Saturday", subject: "Biology / Computer Science", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 17, 2025", day: "Monday", subject: "Islamiat", class: "10", time: "9:00 AM - 12:00 PM" },
    { date: "March 18, 2025", day: "Tuesday", subject: "Pakistan Studies", class: "10", time: "9:00 AM - 12:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Date Sheets", href: "/matric/date-sheets" },
              { label: board.short_name },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {board.short_name} Date Sheet 2025
          </h1>
          <p className="text-violet-100 mt-2">{board.name}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Class 10 - Annual Examination 2025
                </h2>
                <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium">
                  Sample Schedule
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-3 font-semibold text-slate-700">Day</th>
                      <th className="px-6 py-3 font-semibold text-slate-700">Subject</th>
                      <th className="px-6 py-3 font-semibold text-slate-700">Class</th>
                      <th className="px-6 py-3 font-semibold text-slate-700">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sampleSchedule.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-900">{row.date}</td>
                        <td className="px-6 py-3 text-slate-600">{row.day}</td>
                        <td className="px-6 py-3 text-slate-900">{row.subject}</td>
                        <td className="px-6 py-3 text-slate-600">{row.class}</td>
                        <td className="px-6 py-3 text-slate-600">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <p className="font-semibold mb-1">Disclaimer:</p>
              <p>
                This is a sample date sheet for reference. The actual {board.short_name} date sheet
                will be available here once officially released by the board. Check the official
                board website for the most accurate information.
              </p>
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
                      className="text-violet-600 hover:underline"
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
                          href={`/matric/date-sheets/${s}`}
                          className="block text-sm text-violet-600 hover:underline"
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
